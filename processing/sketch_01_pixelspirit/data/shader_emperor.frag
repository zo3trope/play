#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;

float stroke( float xPos, float center, float width ){
		float d 	= step ( center , xPos + width * 0.5) - 
					  step ( center, xPos - width * 0.5 );
		return clamp( d, 0.0, 1.0);
}

// float circleSDF ( vec2 st ){
// 	return length (st -.5) * 2;
// }

float fill( float x, float size){
	return 1.0 - step (size, x);
}

float  rectSDF ( vec2 st, vec2 s){
	st = st * 2.0 - 1.0;
	return max ( abs ( st.x / s.x), abs ( st.y / s.y));
}

void main() {
	//vec2 mouseCoord	= u_mouse / u_resolution;
	vec2 st			= gl_FragCoord.xy / u_resolution;
	vec3 color 		= vec3( 0.0 );
	float sdf		= rectSDF (st , vec2 (1.0));
	color 			+= stroke (sdf, .5, .125);
	color 			+= fill (sdf, .1);
	gl_FragColor	= vec4(color, 1.0);

}
