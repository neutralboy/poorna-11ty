---
title: Why is AI post processing slow?
date: 2026-03-22 17:30:00
keywords: AI, Speech-to-text, Cerebras, Handy, Debugging
description: Debugging why AI post processing in Handy was taking 30 seconds when it should take 1.4 seconds. Turns out the first request to Cerebras with a new API key is always slow.
level: Debugging
layout: post.html
image: /public/handy.png
---

<img src="/public/handy.png" alt="Handy app">

Recently found a really cool app called [Handy](https://handy.computer/) for speech to text. I've also used [FluidVoice](https://github.com/fluid-voice/fluid-voice) which does the same thing. Using Handy with Claude Code has made my development speed a lot faster since my workflow is mostly writing PRDs.

When compared to FluidVoice though, I noticed one weird issue — the AI post processing step is really slow. I use Cerebras with GLM4.7 which is really fast for inferencing, so the model itself can't be the bottleneck. Since Handy is opensource I cloned the repo and started tracking request timings.

All the test cases below use the same paragraph:
```txt
Speech-to-text transcription (STT) is the process of converting spoken words into text. STT does not refer to the captions themselves, but rather to the process of creating them. STT serves as an umbrella term that does not indicate how speech is transcribed, only that speech is being transcribed in some way.
```

I set up basic logging in the Tauri backend and here's what I saw
```log
[2026-03-22][17:14:22][handy_app_lib::llm_client][INFO] [PROFILE] chat_completion start | provider=cerebras | model=zai-glm-4.7 | url=https://api.cerebras.ai/v1/chat/completions
[2026-03-22][17:14:22][handy_app_lib::llm_client][INFO] [PROFILE] client_creation | elapsed=0.212ms
[2026-03-22][17:14:52][handy_app_lib::llm_client][INFO] [PROFILE] http_send | status=200 OK | elapsed=29733.076ms
[2026-03-22][17:14:52][handy_app_lib::llm_client][INFO] [PROFILE] response_parse | elapsed=24.207ms
[2026-03-22][17:14:52][handy_app_lib::llm_client][INFO] [PROFILE] chat_completion done | total=29757.839ms | client=0.212ms | http=29733.076ms | parse=24.207ms
```
Just `http_send` alone took **~30 seconds** which is weird since Cerebras is supposed to be fast. So I tried the same request directly with curl
```bash
curl -w "\n\n---TIMING---\nDNS lookup:    %{time_namelookup}s\nTCP connect:   %{time_connect}s\nTLS handshake: %{time_appconnect}s\nRequest sent:  %{time_pretransfer}s\nTTFB:          %{time_starttransfer}s\nTotal:         %{time_total}s\n" \
  -s \
  -X POST "https://api.cerebras.ai/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer *****" \
  -d '{
    "model": "zai-glm-4.7",
    "messages": [
      {
        "role": "user",
        "content": "Clean this transcript:\n1. Fix spelling, capitalization, and punctuation errors\n2. Convert number words to digits (twenty-five → 25, ten percent → 10%, five dollars → $5)\n3. Replace spoken punctuation with symbols (period → ., comma → ,, question mark → ?)\n4. Remove filler words (um, uh, like as filler)\n5. Keep the language in the original version (if it was french, keep it in french for example)\n\nPreserve exact meaning and word order. Do not paraphrase or reorder content.\n\nReturn only the cleaned transcript.\n\nTranscript:\n\nSpeech to text is the process of converting spoken words into text. STT does not refer to captions themselves, but rather to the process of creating them. STT serves as an umbrella term that does not indicate how speech is transcribed, only that speech is being transcribed in some way."
      }
    ],
    "response_format": { }
  }'
```
```json
{
  "id": "chatcmpl-5c3ed5e6-56f5-4a52-8339-435c79f2b868",
  "model": "zai-glm-4.7",
  "object": "chat.completion",
  "usage": {
    "total_tokens": 1455,
    "completion_tokens": 1142,
    "prompt_tokens": 313
  },
  "time_info": {
    "queue_time": 0.002661306,
    "prompt_time": 0.009088727,
    "completion_time": 1.077586343,
    "total_time": 1.0911362171173096
  }
}
```
```bash
DNS lookup:    0.002068s
TCP connect:   0.021393s
TLS handshake: 0.058937s
Request sent:  0.059016s
TTFB:          1.487677s
Total:         1.488136s
```

The same request took **1.4s** through curl. That's ~20x faster than what Handy was doing.

So I went ahead and added logging to every step of the post processing pipeline to find the exact bottleneck — here's my [commit](https://github.com/neutralboy/handy-profile-requests/commit/70d48e9602b74a50d5c7da9ce5d62e04d258b9c8) for that. When I ran the same speech through it again
```log
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] process_transcription_output start | post_process=true
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] get_settings | elapsed=0.050ms
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] chinese_variant_check | elapsed=0.005ms
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] post_process_transcription call start
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] post_process_transcription fn entry
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] post_process setup done | provider=cerebras | model=zai-glm-4.7 | elapsed=0.009ms
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] structured_output path | about to call LLM | time_since_fn_entry=0.024ms
[2026-03-22][17:22:25][handy_app_lib::actions][INFO] [PROFILE] send_chat_completion_with_schema about to .await
[2026-03-22][17:22:25][handy_app_lib::llm_client][INFO] [PROFILE] chat_completion start | provider=cerebras | model=zai-glm-4.7 | url=https://api.cerebras.ai/v1/chat/completions
[2026-03-22][17:22:25][handy_app_lib::llm_client][INFO] [PROFILE] client_creation | elapsed=0.324ms
[2026-03-22][17:22:26][handy_app_lib::llm_client][INFO] [PROFILE] http_send | status=200 OK | elapsed=1231.637ms
[2026-03-22][17:22:26][handy_app_lib::llm_client][INFO] [PROFILE] response_parse | elapsed=5.184ms
[2026-03-22][17:22:26][handy_app_lib::llm_client][INFO] [PROFILE] chat_completion done | total=1237.315ms | client=0.324ms | http=1231.637ms | parse=5.184ms
[2026-03-22][17:22:26][handy_app_lib::actions][INFO] [PROFILE] send_chat_completion_with_schema returned Ok(Some) | elapsed=1237.389ms
[2026-03-22][17:22:26][handy_app_lib::actions][INFO] [PROFILE] post_process_transcription call done | elapsed=1237.543ms
[2026-03-22][17:22:26][handy_app_lib::actions][INFO] [PROFILE] process_transcription_output done | total=1237.648ms
```
This time the whole thing took **1.2s**. Wait what? Did adding logging somehow fix an async bug? Did I solve it before I even figured out what was wrong?

I ran it again — **1.3s**. And again. It stayed fast over the next 10 attempts.

Turns out the first request to Cerebras with a new API key is always super slow because of a model context switch that needs to happen on their end. Every request after that is fast. If I had just repeated the test the first time I would've seen this immediately.

### Moral of the story
Never debug off a single request. If I had just run it 10 times instead of once, I would have seen the second request come back in 1.3s and saved myself an hour of adding profiling logs.