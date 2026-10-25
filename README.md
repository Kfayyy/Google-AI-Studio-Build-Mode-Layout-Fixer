# Google AI Studio - Build Mode Preview Resizer

[![Instal Script](https://img.shields.io/badge/Tampermonkey-Installer_le_Script-green.svg)](https://raw.githubusercontent.com/Kfayyy/Google-AI-Studio-Build-Mode-Layout-Fixer/main/Google-AI-Studio-Layout-Fixer.user.js))

A lightweight userscript that fixes the broken layout in Google AI Studio's **Build Mode**, making your workspace clean, ergonomic, and fully readable on any screen resolution.

## Why this script exists

When building apps with Gemini, the live preview panel dramatically stretches across the screen, completely crushing the chat window. Because Google forces strict inline styles (`width: 540px`) dynamically via Angular directly onto the chat element, standard CSS overrides are entirely ignored. 

This script safely bypasses those constraints to restore perfect layout control.

## Key Features

* **Interactive Drag & Drop:** Hover over the central vertical separator (`<ms-console-splitter>`) to freely resize the preview panel.
* **Persistent Layout Balance:** Forcibly overrides Angular's inline flex values to let the left chat window automatically scale and occupy 100% of the remaining screen space.
* **Anti-Angular Reset Loop:** Runs a high-performance `MutationObserver` in the background to prevent the framework from constantly resetting your chosen custom widths during message streaming.
* **Privacy-First:** 100% client-side. Zero external network requests, zero tracking, and zero modification of your prompt or model responses.

## Installation

### 1. Install a Userscript Manager
Install **Tampermonkey** for your preferred browser:
[tampermonkey.net](https://www.tampermonkey.net/)

### 2. Install the Userscript
Click the badge below to load and install the script automatically:

[![Installer le Script](https://img.shields.io/badge/Tampermonkey-Installer_le_Script-green.svg)](https://raw.githubusercontent.com/Kfayyy/Google-AI-Studio-Build-Mode-Layout-Fixer/main/Google-AI-Studio-Layout-Fixer.user.js)


### 3. Start Building
Open or refresh your workspace on [Google AI Studio](https://aistudio.google.com/). The central splitter bar will instantly feature a horizontal resize cursor (`↔️`).

---

## Feedback & Issues

If you find a layout bug after a Google AI Studio update, please open an issue:

[https://github.com/Kfayyy/Google-AI-Studio-Build-Mode-Layout-Fixer/issues](https://github.com/Kfayyy/Google-AI-Studio-Build-Mode-Layout-Fixer/issues)

**Version:** 3.0  
**License:** MIT  
**Author:** Kfayyy
