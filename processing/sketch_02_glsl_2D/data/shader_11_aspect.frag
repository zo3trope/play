#ifdef GL_ES
precision mediump float;
#endif

// GLSL 2D Tutorials | https://www.shadertoy.com/view/Md23DV
// Uğur Güney

/*
	by Uğur Güney. March 8, 2014. 

	Hi! I started learning GLSL a month ago. The speedup gained by using
	GPU to draw real-time graphics amazed me. If you want to learn
	how to write shaders, this tutorial written by a beginner can be
	a starting place for you.

	Please fix my coding errors and grammar errors. :-)
*/

// Ported to Processing by Zoe Sandoval
// zoesanodval.com

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Tutorial 11
// MAKING THE ASPECT RATIO OF THE COORDINATE SYSTEM 1.0
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// As we have seen from the previous examples, we do get rectangles
// instead of squares when we plot the coordinate systems.
// It is because, we assigned same numerical interval, [0,1] to different
// physical distances. Actually the width of the frame is bigger 
// than of its height.
// So, to keep the aspect ratio, we should not map the actual distances
// [0, iResolution.x] and [0, iResolution.y] to the same interval.

// Note that iResolution is actually u_resolution here.

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

//functions

void main() {
	
	vec2 st				= (gl_FragCoord.xy / u_resolution) * 2 - 1;
	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	
	vec3 backgroundColor 			= vec3(1.0);
	vec3 axesColor 					= vec3(0.0, 0.0, 1.0);
	vec3 gridColor 					= vec3(0.5);
	
	// start by setting the background color. If pixel's value
	// is not overwritten later, this color will be displayed.
	vec3 pixel 						= backgroundColor;
	
	// Draw the grid lines
	// This time instead of going over a loop for every pixel
    // we'll use mod operation to achieve the same result
    // with a single calculation (thanks to mikatalk)
	const float tickWidth 			= 0.1;
	if( mod(st.x, tickWidth) < 0.008 ) pixel = gridColor;
    if( mod(st.y, tickWidth) < 0.008 ) pixel = gridColor;
    // Draw the axes
	if( abs(st.x)<0.006 ) pixel 		= axesColor;
	if( abs(st.y)<0.007 ) pixel 		= axesColor;

	gl_FragColor	= vec4(pixel, 1.0);

}
