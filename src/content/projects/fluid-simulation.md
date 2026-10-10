## A small room, a coupled system

This six-person computer graphics project builds a pool-inspired scene with moving water, floating objects, and offline path tracing. The wider renderer combines physically based materials, BVH acceleration, keyframe animation, and camera trajectories in C++ / OpenGL.

## My contribution: integrating APIC fluids

I selected the APIC fluid method and integrated the scene into the simulation grid. The pipeline aligns mesh coordinates with the grid, voxelizes triangle surfaces, and uses breadth-first traversal to distinguish exterior space from solid regions. Fluid particles are initialized in valid cells rather than inside solid geometry.

I also worked on initial surface ripples and drainage, and separated simulation parameters into configuration files so that the scene and fluid settings could be adjusted without changing simulation code.

## Buoyancy and thread synchronization

I connected fluid output to rigid bodies through buoyancy force and torque calculations. Simulation, Bullet physics, and offline rendering run as separate stages of the pipeline and must agree on the frame being rendered. My work separated and synchronized these stages, alongside parallel simulation and rendering, so that expensive rendering did not dictate every simulation operation.

Water-material parameters and initial reflection/refraction effects were also part of my contribution. Other teammates built the main path tracer, BVH implementation, scene assets, and animation; the images below represent the combined team result.

## Lessons from the implementation

The report records practical limitations: fluid–rigid coupling is approximate, parameter choices can destabilize floating objects, and the simulation cannot fully restore its physical state after an interrupted offline render. These constraints made explicit synchronization and small test scenes particularly important during development.

The APIC work drew on the libfluid reference implementation, as acknowledged in the team report. The source repository is linked above. Selected team images follow.
