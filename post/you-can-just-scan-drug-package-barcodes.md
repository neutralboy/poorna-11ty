---
title: You can just scan drug package barcodes
date: 2026-03-15 10:37:00
keywords: Healthcare, NDC, Barcodes, Patient Safety, EHR
description: How good regulation and state capacity makes drug barcode scanning trivially easy in the US, and why it's still complicated in India.
level: Opinion
layout: post.html
image: /public/ndc-barcode-prednisone.png
---

After a long hiatus from writing, I'm back with a piece about how state capacity and good regulation can lead to wonderful outcomes. This story comes from my personal experience building EHRs that needed barcode scanning to identify drugs before administration — the idea being that if you scan a drug's barcode before giving it to a patient, you can validate it against the prescription and prevent medication errors.

This was a feature request I'd been putting off for months. I assumed we'd need access to some proprietary dataset that maps barcodes to product details. The alternative was having the inventory manager scan everything manually to maintain a log of all drugs in stock, which is error-prone and forces a change in their workflows. In India, where I previously developed applications, it was always complicated — you'd typically contract with a pharmacy chain just to get access to this data.

Curiously, while exploring options with Claude, I learned that all drug barcodes in the US have the National Drug Code (NDC) encoded within them. This was completely new to me. It meant I could build a scanner using any standard barcode reader and look up the drug details using the NDC directory, which the FDA makes freely available — [National Drug Code Directory](https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory).

Here's an example for Prednisone 5mg — the barcode reads 93520-18481, and the corresponding NDC number is 12634-18481:

<img src="/public/ndc-barcode-prednisone.png" alt="Prednisone 5mg barcode showing NDC number">

On the surface, this seems like a straightforward feature of a country where regulators actually want people to use the directories they build, ultimately improving patient safety. India tells a different story. The agency that approves drugs for human use and the agency responsible for making these datasets available aren't the same, which leads to datasets that aren't accurate. If you're a business and you know the data you're getting isn't reliable, you simply won't put it into production — and that's exactly what's happened with India's drug codes.

<img src="/public/nrces-snomed-release.png" alt="NRCES SNOMED CT release notes showing limited drug coverage">

They'll even tell you in their [release notes](https://www.nrces.in/resources#snomedct_releases) that they don't intend to cover all drugs.
