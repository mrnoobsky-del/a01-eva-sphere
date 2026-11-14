# Contributing to A-01 / Eva Sphere

A-01 is a public research and development record for a human-centred modular habitat and its digital twin. Architects, engineers, software developers, energy and data-centre specialists, industrial designers, accessibility experts and independent Sphere teams are welcome.

## Ways to participate
- Report reproducible bugs with browser/device details and screenshots.
- Propose focused digital-twin improvements.
- Add research sources, explaining what they do and do not establish.
- Review shell, energy, water, waste, data-centre, accessibility, maintenance and safety concepts.
- Propose a community Sphere using the manifest in `spheres/template/sphere.json`.

## Add a community Sphere
1. Copy `spheres/template/` to `spheres/<your-sphere-id>/`.
2. Use a unique lowercase ID with hyphens.
3. Complete `sphere.json`; unknown values must remain `null` or be marked proposed.
4. Add a README with the team, assumptions, evidence, risks and open questions.
5. Submit a pull request titled `Add community Sphere: <id>`.

Every Sphere is an independent proposal or project record. Registry inclusion does not mean it is built, certified, owned by A-01 or endorsed as safe. Credit contributors accurately.

## Engineering submissions
Include the scenario, units, assumptions, calculation method, source links, alternatives, failure modes, maintenance needs and verification status. Do not present a rendering or an unreviewed estimate as a construction specification. Critical structure, façade, lifts, fire safety, electrical systems and data-centre plant require qualified professionals and site-specific verification.

## Security and privacy
Never commit passwords, API keys, tokens, private addresses, identity documents, private conversations or production secrets. Physical control of doors, lifts, power and other critical systems must not be added without access control, auditability, local fail-safe operation and human authority.

## Licensing status
The repository currently has no open-source license. A public repository or merged pull request does not itself grant permission to reuse or redistribute the project. Until the project publishes a license and contribution terms, use issues and pull requests for discussion, research references, test reports and proposed Sphere manifests. Submit code, CAD, images or other assets only when you have the rights to share them and the terms are clear.

Contributions may be revised, deferred or declined where evidence, safety, accessibility, privacy, maintainability or ownership is unclear.
