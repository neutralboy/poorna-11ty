---
title: How are Medical CMEs funded ? An insight into the world of Indian Pharma Marketing
date: 2023-06-22 20:59:39
keywords: Healthcare, Medicine, Doctor, Pharma
description: How can Pharma companies fund CMEs that involve hundreds of people and cost lakhs of rupees ? What is the upside ?
level: Opinion
layout: post.html
image: https://poorna-657a.s3.ap-south-1.amazonaws.com/public/ac5ydavieeqcqa3gnkcw.png
---

Continuing Medical Education Programmes are a system to educate doctors about updated treatment protocols, diagnostic updates and new treatment guidelines. Medical license renewal system that happens every 10 years takes into account the number of CMEs attended by each doctor during that period through a scoring system. This creates an incentive for doctors to catch up with all the latest updates.

The primary sponsors of these programmes are Pharma companies that have therapies to manage the disease being presented at the CME. For example, Novartis Nordisk regularly conducts CMEs on Glycemic Control using Insulins in which they advertise their key products Tresiba and Tujeo. Banners and Standees of these can be often seen on stage of the CME.

CMEs have hence become a marketing tool for Pharma companies, which is fine on its own as introduction of new drug regimens do benefit patients. The question I found myself asking is - How can these companies fund CME's at a bi-weekly frequency ? What is the upside to conducting these ?

<figure>
    <img  src="https://poorna-657a.s3.ap-south-1.amazonaws.com/public/ac5ydavieeqcqa3gnkcw.png" alt="Tresiba disposable cartridge" >
    <figcaption>
        Tresiba refillable cartridge
    </figcaption>
</figure>

> **Quick guide to Insulin Therapy:** Insulin's such as Degludec are considered long acting due to their long action time of 24-48 hours. To mimic the body's natural secretion pattern a short acting + long acting is used. For example, Insulin Isophane (Short acting) + Tresiba (Long Acting)

> Degludec is a long acting form of Insulin used for glycemic control in Diabetics. Human Insulin lasts only 20 minutes in the blood stream which is inadequate for people who produce low insulin (Type 2 Diabetes) or no insulin at all (Type 1 Diabetes)

Lets calculate the amount of money a 15 year old newly diagnosed patient taking Tresiba is going to spend over the course of his lifetime:

Firstly the constants:

<pre id="latex" >
\\\text {Each Cartridge contains 300 IU of Insulin}
\\\text {Cost of each cartridge is 1440 INR}
\\\text {Patient takes 20 IU of subcutaneous Insulin Tresiba currently}
</pre>

Insulin demand typically increases over a patients lifetime, down below is a typical dosage therapy:
| Age (in years) | Insulin units per day (in IU) |
| ----- | --------------------- |
| 15-20 | 20 |
| 20-30 | 30 |
| 30-70 | 40 |

Now lets calculate the costs

<pre id="latex">
\text {Cost per unit} = \dfrac {1440} {300} = 4.8 \; \text {INR}
\\\
\\\text {Insulin needed from years 15 to 20} = 5 \; \text {years} \cdot 365 \; \text {days} \cdot 20 \; \text{Units per day} = 36500 \; \text{Units}
\\\text {Insulin needed from years 20 to 30} = 10 \; \text {years} \cdot 365 \; \text {days} \cdot 30 \; \text {Units per day} = 109500 \; \text {Units}
\\\text {Insulin needed from years 30 to 70} = 40 \; \text {years} \cdot 365 \; \text {days} \cdot 40 \; \text {Units per day} = 584000 \; \text {Units}
\\\text {Total Insulin required} = ( 36500 + 109500 + 584000 ) \cdot 4.8 \;\text {INR} = 35,04,000 \;\text {INR or 42,216 USD}
</pre>

The cost of Tresiba over the course of the life time of this Type 1 Diabetic patient is <p class="text-3xl"> $42,216 </p>
at an exchange rate of 83 INR per USD.

To put these costs into context, India's per capita income per year is **$ 2,256.6** according to the [World Bank](https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?end=2021&locations=IN&start=1996). This is equal to almost **18.7 years** of an Indians lifetime.
Now lets apply [discounted cash flow method](https://en.wikipedia.org/wiki/Discounted_cash_flow) to estimate the current value of a 15 year old newly diagnosed Type 1 Diabetes patient:

<pre id="latex">
 \\\ {Future Value}_1 = \text{Future value of 15-20 years} \\{Future Value}_2 = \text{Future value of 20-30 years} 
\\FV_3 = \text{Future value of 30-70 years}\\\ \text{Rate of discount annually} = 6\% 
\\\
  \\\text {Future Value}_1+{Future Value}_2+{Future Value}_3 = {Present Value}_1(1+d_t)^{-t} +{Present Value}_2(1+d_t)^{-t} +{Present Value}_3(1+d_t)^{-t}

\\\ = 36500 \times 4.8 \text{INR} ( 1 + 0.06)^{-5} + 109500 \times 4.8\text{INR} ( 1 + 0.06 )^{-15} + 584000 \times 4.8 \text{INR}( 1 + 0.06 )^{-55}
\\\ = 130919.6 + 219391.5 + 113718.6
\\\ = 464029.7 \text {INR}
</pre>

Present discounted value of the patient is 
<p class="text-3xl" >$ 5,524</p>

Running the same set of calculations for a Type 2 Diabetics who was diagnosed at the age of 40 and put of Tresiba. Type 2 Diabetics usually require significantly less Tresiba since they can partially produce their own Insulin.
<pre id="latex">
\text { A 40 year old is usually put on 25 units per day }
\\\
\\\text {Total money spent from 40 years to 70 years} = 30 \;\text{years} \times 365 \;\text{days} \times 25 \;\text{Units} \times 4.8 \;\text{INR}
\\\ = 13,14,000 \;\text{INR or 15,830 USD}
\\\
\\\text {Present Value of the Patient} = \text {Current Value} \times ( 1 + 0.006 )^{-30}
\\\ = 10,98,135.5\;\text{INR or 13,230 USD}
</pre>

Present Discounted value of a Type 2 Diabetic is <p class="text-2xl" >$ 13,230</p>

For the CME programme to be economically succesful the number of patients that need to be started on Tresiba is <p class="text-3xl font-bold bg-red-200 border-b-4 border-solid border-red-500 inline-block p-2 m-0" >1 patient</p>

Assuming the CME cost around 40,000 INR or 500 USD to host.


This article is an attempt to peek at the economics of marketing Insulins in India. A lot of factors have not been taken into account in my calculations.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css" integrity="sha384-3UiQGuEI4TTMaFmGIZumfRPtfKQ3trwQE2JgosJxCnGmQpL/lJdjpcHkaaFwHlcI" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.js" integrity="sha384-G0zcxDFp5LWZtDuRMnBkk3EphCK1lhEf4UEyEM693ka574TZGwo4IWwS6QLzM/2t" crossorigin="anonymous"></script>
<script>
document.querySelectorAll("#latex").forEach((el) => {
    el.innerHTML = katex.renderToString(el.innerHTML, {
    throwOnError: false,
    });
});
</script>
