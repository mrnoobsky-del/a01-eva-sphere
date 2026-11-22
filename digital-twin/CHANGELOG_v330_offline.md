# A-01 v3.3.0 Offline Edition — Changelog

## Documentation milestone

- Added Russian, English, and Simplified Chinese offline architecture specifications.
- Defined A-01 CORE, World Runtime, Local Knowledge, Local Data, Online Adapter, and Optional Local AI.
- Separated Single HTML Offline, Portable Offline Pack, and HTTPS/PWA distribution profiles.
- Defined network isolation, persistence probing, JSON backup/import, synchronization consent, and third-party license requirements.
- Added implementation phases and measurable offline acceptance criteria.
- Added a test matrix with PASS / FAIL / NOT TESTED semantics.

## Explicitly not delivered yet

- No verified self-contained offline HTML is included in this documentation milestone.
- No browser acceptance run with the network disabled has been recorded.
- No PWA or uCoz deployment has been performed.
- The v3.2.2 build remains online-dependent.
- The previous local-engine archive is not accepted as a complete offline distribution without a content audit.

## Next engineering step

Perform a full dependency and asset audit of the selected source build, then implement a reproducible build pipeline that embeds the entire required runtime and assets. Only after browser acceptance may the executable artifact be labelled Offline Edition.
