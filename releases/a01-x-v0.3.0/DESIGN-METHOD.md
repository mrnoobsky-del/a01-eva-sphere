# A-01 X Design Method: Riddle to Engineering Decision

**Document version:** 0.1 · **Date:** 22 November 2026  
**Status:** research and design method; not evidence of a deployed system

## Why riddles belong in engineering

An unexpected question can expose a requirement hidden by an ordinary feature list. In A-01 X, a riddle is not left as a joke or an untracked idea. Its answer must become a testable building requirement.

**The primary subject is the Sphere, not the human model.** Human Proxy profiles are instruments for evaluating consequences. They must not force people to tolerate an uncomfortable environment or become the only way the building detects problems.

## The repeatable loop

1. **Riddle:** frame a question about a discomfort, dependency, edge case or failure.
2. **Decompose:** list plausible physical, biological, behavioural, social and operational causes.
3. **Hypothesize:** state what would support or falsify each explanation.
4. **Specify:** translate the hypothesis into observable building behaviour.
5. **Model:** choose the right level: geometry, navigation, thermal balance, ventilation, acoustics, lighting, water, energy, operations or cybersecurity.
6. **Test:** run normal, peak, fault and recovery scenarios.
7. **Record evidence:** preserve inputs, model version, sensor calibration, results and uncertainty.
8. **Decide:** accept, reject or keep the hypothesis open; assign an owner and next action.
9. **Improve:** update rules or models only after offline review, side-effect analysis and human approval.

**RIDDLE → HYPOTHESES → REQUIREMENT → MODEL → TEST → EVIDENCE → DECISION → UPDATE**

## Riddle card

Every item should include:
- stable ID, question and Sphere domain;
- why it matters and who is affected;
- multiple explanations where appropriate;
- known facts, unknowns, evidence quality and jurisdiction;
- falsifiable hypothesis;
- affected zones, systems, user profiles and operating modes;
- measurable requirement and safety constraints;
- calculation or simulation method;
- test scenario and pass/fail criteria;
- side effects: energy, maintenance, access, privacy, water, waste and noise;
- status: `open`, `hypothesis`, `test-ready`, `verified`, `rejected`, or `blocked`;
- decision record and change history.

Never replace an unknown value with an invented number. A threshold that depends on country, room type or standard edition must record the jurisdiction and applicable edition.

## Initial A-01 X riddles

### R-001. Why can someone become tired even when they barely walk?
Fatigue is not a step counter. Heat or cold, awkward posture, prolonged standing, dehydration, noise, glare, poor sleep, cognitive overload and lack of recovery may contribute. The Sphere therefore needs seating, posture choice, hydration, nourishment, quiet rooms, environmental control and privacy—not merely transport. Test synthetic activity and sensitivity profiles over the 13-hour building scenario. Do not diagnose health.

### R-002. If every floor has the same average temperature, why can the top floor still feel hot?
Averages hide vertical stratification, solar gain through the roof, radiant surfaces and local air currents. Model the atrium in vertical and horizontal zones, place measurement points at different heights, and validate simplified thermal models against measurements. Use CFD only where a simpler model cannot answer the engineering question.

### R-003. If CO₂ is within its target, does that prove the air is good?
No. CO₂ is one indicator and does not measure all particles, VOCs, CO, ozone, cleaning chemicals, humidity or biological hazards. The Sphere needs an outdoor-air and exhaust strategy, known source control, filtration, maintenance and risk-based measurements. Test occupancy peaks, cooking, cleaning, showers, outdoor pollution and filter failure.

### R-004. Can indoor plants replace ventilation?
No. Plants do not replace designed outdoor air or contaminant control. Irrigation, soil, pollen, pests and evapotranspiration add humidity and maintenance needs. Treat the greenhouse as a distinct climate and water zone.

### R-005. If there is an elevator, why keep stairs?
Elevators support everyday step-free access, but an ordinary elevator must not automatically be treated as an evacuation route. Stairs and a separately engineered egress strategy remain necessary under applicable fire and building rules. Escalators supplement flow but are not an accessible substitute.

### R-006. Can a room be quiet but not private?
Yes. Low average sound does not guarantee speech privacy. Peaks, low-frequency sound, reverberation, doors and structure-borne paths matter. Design separate criteria for toilets, showers, meeting rooms and resting rooms. Acoustic testing must not record conversations.

### R-007. Why might washroom odour reach a corridor even when an exhaust fan is running?
Air balance, open doors, short-circuit flow, insufficient exhaust, dry traps or poor maintenance can defeat odour containment. Model transfer paths, supply/exhaust balance and door operation; verify door forces. Do not prescribe pressure differences without engineering calculation.

### R-008. How will a person find a quiet place inside a large dome?
Rest areas must be legible, reachable on step-free routes and away from unavoidable noisy circulation. Provide repeating landmarks, clear signs, seating, water and nearby accessible sanitation.

### R-009. Can AI infer anxiety from a camera or voice?
Such inference is unreliable, context-sensitive and intrusive. Do not use covert emotion recognition, mandatory biometrics, face recognition or speech analysis. Preferences and feedback should be voluntary and minimal; environmental data should be aggregated where possible.

### R-010. Does one normal sensor reading prove a zone is safe?
No. A sensor can be misplaced, uncalibrated, stale or faulty. Important measurements need a placement strategy, calibration, plausibility checks, redundancy and a defined response to missing data. Low-cost sensors do not replace laboratory or professional measurements.

### R-011. What happens if an elevator stops while a person is on an upper level?
Navigation alone does not solve access. Test loss of one elevator, queues, step-free alternatives, communication, staff assistance, waiting areas and only code-approved evacuation provisions. An escalator is not an accessible replacement.

### R-012. What if power or the network fails?
Local controllers, selected backup loads, manual controls, network segmentation, event logs and a safe offline mode must keep essential functions available without cloud AI.

### R-013. Can one number such as “comfort 93%” describe the Sphere?
No. Good lighting cannot compensate for CO exposure, an inaccessible toilet or overheating. Safety and access are hard constraints. Comfort, energy and preferences are optimized separately inside those limits.

### R-014. Can the Sphere learn continuously and change settings by itself?
Not in critical control loops. Online learning can drift and create unrepeatable behaviour. Use shadow mode, reproducible tests, baseline comparison, human approval, limited scope and rollback.

### R-015. How can we prove that 13 hours inside are comfortable?
One simulation and one average profile are insufficient. Evidence requires surveyed geometry, calibrated instruments, realistic occupancy, diverse voluntary participants, expert review and repeatable commissioning. v0.3.0 defines a test protocol; real-world comfort remains unproven until a physical building exists.

## When is a riddle solved?

Only when its explanation has evidence or is labelled a hypothesis; a testable requirement exists; the test and failure criteria are written; cross-system side effects and safe fallback are reviewed; and the decision is versioned and assigned.

Uncertainty is an acceptable result. False certainty is not.
