## A meeting across worldlines

Worldline Knot (命运石扭结) is a personal digital-logic mini-game inspired by the time-travel ideas of Steins;Gate and the temporal puzzles of Braid. Two characters move through opposing temporal directions; the player switches perspective and changes movement to bring their worldlines together.

The project explores a small but demanding interaction: the character outside the player's current viewpoint keeps moving. A decision in one perspective changes the situation encountered in the other.

## On the VGA display

These photographs document the game running with its FPGA board and VGA display. They show a change of character viewpoint and a test in which both characters appear together. The hardware and display remain visible to preserve the context of the original demonstration.

## From interaction to hardware

The design uses rotary input for movement and a press to switch perspective. The hardware implementation separates input processing, game logic, control state, and display output. VGA supplies the visual scene, while LEDs and a seven-segment display expose additional game state.

In the repository, the top-level `Gate0_top` module connects the controller, `meet_logic`, digit display, and VGA output. Frame synchronization links the game update to the display pipeline. Sprite ROMs and layered graphics make the visual design a hardware resource problem as well as an interaction problem.

## Explore the implementation

The linked repository contains Verilog modules and Vivado project files. This is a hardware project showcase; a browser-playable build is not available here. Running the original requires a compatible FPGA setup and the associated toolchain. A web adaptation would require a new input and rendering implementation, plus a review of the original media assets.

This is an unofficial fan-inspired project, not an official Steins;Gate game. Selected photographs from my project report document the hardware demonstration; the game imagery visible within them belongs to its respective rights holders. No standalone franchise artwork or music is distributed here.
