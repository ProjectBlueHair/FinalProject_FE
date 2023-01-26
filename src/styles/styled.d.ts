import  'styled-components';
import { color } from './theme';

declare  module  'styled-components' {
	export  interface DefaultTheme { // 정의할 Theme
		color: typeof color // 원하는 속성의 타입 선언
	}
}