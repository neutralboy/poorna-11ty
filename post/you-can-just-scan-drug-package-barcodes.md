---
title: You can just scan drug package barcodes
date: 2026-03-15 10:37:00
keywords: Healthcare, NDC, Barcodes, Patient Safety, EHR
description: How good regulation and state capacity makes drug barcode scanning trivially easy in the US, and why it's still complicated in India.
level: Opinion
layout: post.html
image: /public/ndc-barcode-prednisone.png
---

After a long time I have had the idea to get back to writing blog article and this one is about how state capacity and ability to write good legislation leads to wonderful outcomes. This story is drawn from my personal experience building EHRs that needed barcode scanning to enter drugs to prevent errors in administration. If barcode is scanned before administration then it can be validated against prescription to make sure its compliant. This was a requested feature for months on end and I had put it off since I assumed that we needed access to a proprietary dataset that contains barcode mappings to the product details. The other option is that I have the inventory manager scan everything so that we maintain a log of all drugs, this is error prone and introduces a new change in their workflows.
In India where I previously developed applications it was complicated and you usually contracted with a pharmacy chain to get access to this data.

Curiously while exploring options with Claude, where it told me that all barcodes for drugs in the US have National Drug Number encoded within them. This was new information to me. This meant that I could write a scanner using any barcode reader and interpret the barcodes using NDC which is free to download on FDAs own site - [https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory](https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory)

Example for Prednisone 5mg that shows Barcode 93520-18481 and corresponding NDC number as 12634-18481
<img src="/public/ndc-barcode-prednisone.png" alt="Prednisone 5mg barcode showing NDC number">

At the top this seems like a normal feature of a country where the regulators want to make it easier for people to use the directories they build so that it increases patient safety. This is not the case in India, where the agency that approves drugs for human use and the agency responsible for making these data sets available arent the same leading to datasets that arent accurate. As a business if you know the data you're getting isnt accurate you wont put it into use at all and this is the case with Indias Drug codes.
<img src="/public/nrces-snomed-release.png" alt="NRCES SNOMED CT release notes showing limited drug coverage">

They'll even tell you in their release file which can be found here: [https://www.nrces.in/resources#snomedct_releases](https://www.nrces.in/resources#snomedct_releases) that they dont want to cover all drugs.
