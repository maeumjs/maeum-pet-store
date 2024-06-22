# 주의 사항

## tsc-alias

1. tsc-alias 때문에 경로 문제가 좀 있음
  * 디렉터리 이름이 package.json에 있는 모듈 이름과 동일하면 안된다. 예를들어 cron 패키지를 설치했는데, cron 디렉터리를 만드니까 그걸 상대 경로 지정하는 버그가 있었음
  * 이 문제는 해결이 될지 잘 모르겠는데 이걸 해결하려면 package.json의 의존성을 넘겨줘야 할 것 같은데 좀 문제다
2. tsc-alias 때문에 .mjs를 사용할 수 없다
  * .mjs로 import statement를 확장하니까 tsc-alias가 경로를 찾지 못하는 모습을 보였다
3. 특정 설정에서 .js가 중복해서 적용된다

## esbuild

1. https://www.npmjs.com/package/@esbuild-plugins/tsconfig-paths
  * 왜 나만 그런가 모르겠는데 잘 동작하지 않았다

## import/extensions

1. https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/extensions.md
  * js 
