# A-01 v4.1.3 — Changelog

**Date:** 24 November 2026  
**Release type:** current primary integrated digital-twin build  
**Source:** published Wix v4.1.3 artifact

## Changes

- Published the clean v4.1.3 HTML artifact as the current primary digital-twin build.
- Preserved the v4.0.9 static geometry batching and feature-picking work.
- Kept feature-batch registries declared before any functions that access them, fixing the temporal-dead-zone startup failure involving `a01FeatureBatchById`.
- Replaced the external adaptive-quality package with a native adaptive pixel-ratio controller inside the existing frame loop.
- Kept camera damping disabled and preserved separate camera-rotation and sphere-rotation test controls.
- Retained detailed startup exception text for diagnosing future loading failures.

## Verification status

- The user confirmed that the v4.1.3 3D scene loaded in a browser on 24 November 2026.
- A repeatable FPS benchmark has not been completed.
- No 60 FPS result is claimed.
- Cross-device GPU/WebGL acceptance and engineering validation remain outstanding.

## Preserved baseline

A-01 v4.0.0 remains available as the preserved architecture foundation. Previous preview files and release notes are not overwritten by this release.
