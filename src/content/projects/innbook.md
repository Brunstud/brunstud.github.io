## From writing a story to inhabiting one

InnBook (炉边书) explores a shared narrative space for writers, role-playing participants, and AI characters. Instead of treating generation as a single text-completion step, the project organizes stories around characters, a shared world, and the consequences of their actions.

## Agent orchestration

My engineering work combines hierarchical prompting, LLM inference, scene orchestration, and turn-based scheduling. Agent-specific behavior gives characters distinct roles in an unfolding narrative.

The HCI design extends this idea into a character-and-world model: characters have motivations, remembered interactions, and contextual information, while a shared world tracks places, events, and state. The intended loop is **world state → character action → feedback → updated state**. These are design concepts from the course report, rather than a claim that every proposed capability is complete.

## Keeping the author in control

The report calls its central interaction metaphor “horse-riding”: an agent can move forward independently while a human guides its direction. Writers can suggest a motivation, steer an action, or take direct control at an important moment. The editor pairs chapter navigation with character perspectives and a branching story view, helping authors move between the overall narrative and individual decisions.

## My contribution

For the four-person HCI course project, I contributed requirements analysis, user research, creation-module page design, and the presentation. The screenshots on this page show that team prototype. The engineering work described above is documented in my CV; the interface images illustrate the interaction design, not a publicly deployed service.

## What remains open

The report identifies story-tree enactment, collaborative permissions, and coordination between AI and the human game master as areas for further development. Keeping character behavior coherent while leaving room for author intervention remains the central design challenge.
