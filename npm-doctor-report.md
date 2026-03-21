# 🩺 依存関係ヘルスレポート

> 🐹 **小豆沢 こはね**: 依存関係レポート、できたよ！古いパッケージ、少しずつでも追いつけるように更新しようよ！

**実行日時**: 2026/03/21 11:28:49 JST

---

## 📦 npm outdated

```
Package                            Current    Wanted   Latest  Location                                       Depended by
@emotion/styled                    11.14.0   11.14.1  11.14.1  node_modules/@emotion/styled                   Next-project-btw
@mui/icons-material                5.16.13    5.18.0    7.3.9  node_modules/@mui/icons-material               Next-project-btw
@mui/material                      5.16.13    5.18.0    7.3.9  node_modules/@mui/material                     Next-project-btw
@storybook/addon-essentials         7.6.20    7.6.24   8.6.14  node_modules/@storybook/addon-essentials       Next-project-btw
@storybook/addon-interactions       7.6.20    7.6.24   8.6.14  node_modules/@storybook/addon-interactions     Next-project-btw
@storybook/addon-links              7.6.20    7.6.24   10.3.1  node_modules/@storybook/addon-links            Next-project-btw
@storybook/addon-onboarding         1.0.11    1.0.11   10.3.1  node_modules/@storybook/addon-onboarding       Next-project-btw
@storybook/addon-viewport           7.6.20    7.6.24    9.0.8  node_modules/@storybook/addon-viewport         Next-project-btw
@storybook/blocks                   7.6.20    7.6.24   8.6.14  node_modules/@storybook/blocks                 Next-project-btw
@storybook/nextjs                   7.6.20    7.6.24   10.3.1  node_modules/@storybook/nextjs                 Next-project-btw
@storybook/react                    7.6.20    7.6.24   10.3.1  node_modules/@storybook/react                  Next-project-btw
@storybook/test                     7.6.20    7.6.24   8.6.15  node_modules/@storybook/test                   Next-project-btw
@types/node                       20.17.10  20.19.37   25.5.0  node_modules/@types/node                       Next-project-btw
@types/react                       18.3.18   18.3.28  19.2.14  node_modules/@types/react                      Next-project-btw
@types/react-dom                    18.3.5    18.3.7   19.2.3  node_modules/@types/react-dom                  Next-project-btw
@types/yargs                       17.0.33   17.0.35  17.0.35  node_modules/@types/yargs                      Next-project-btw
@typescript-eslint/eslint-plugin    8.18.2    8.57.1   8.57.1  node_modules/@typescript-eslint/eslint-plugin  Next-project-btw
@typescript-eslint/parser           8.18.2    8.57.1   8.57.1  node_modules/@typescript-eslint/parser         Next-project-btw
axios                                1.7.9    1.13.6   1.13.6  node_modules/axios                             Next-project-btw
eslint                              8.57.1    8.57.1   10.1.0  node_modules/eslint                            Next-project-btw
eslint-config-next                  14.2.4    14.2.4   16.2.1  node_modules/eslint-config-next                Next-project-btw
eslint-config-prettier               9.1.0     9.1.2   10.1.8  node_modules/eslint-config-prettier            Next-project-btw
eslint-plugin-import                2.31.0    2.32.0   2.32.0  node_modules/eslint-plugin-import              Next-project-btw
eslint-plugin-prettier               5.2.1     5.5.5    5.5.5  node_modules/eslint-plugin-prettier            Next-project-btw
eslint-plugin-storybook             0.6.15    0.6.15   10.3.1  node_modules/eslint-plugin-storybook           Next-project-btw
eslint-plugin-unused-imports         4.1.4     4.4.1    4.4.1  node_modules/eslint-plugin-unused-imports      Next-project-btw
i18next                            23.16.8   23.16.8   25.9.0  node_modules/i18next                           Next-project-btw
next                                14.0.3    14.0.3   16.2.1  node_modules/next                              Next-project-btw
next-i18next                        15.4.1    15.4.3   15.4.3  node_modules/next-i18next                      Next-project-btw
prettier                             3.4.2     3.8.1    3.8.1  node_modules/prettier                          Next-project-btw
react                               18.3.1    18.3.1   19.2.4  node_modules/react                             Next-project-btw
react-dom                           18.3.1    18.3.1   19.2.4  node_modules/react-dom                         Next-project-btw
sass                                1.83.0    1.98.0   1.98.0  node_modules/sass                              Next-project-btw
storybook                           7.6.20    7.6.24   10.3.1  node_modules/storybook                         Next-project-btw
swiper                             11.1.15   11.2.10   12.1.2  node_modules/swiper                            Next-project-btw
typescript                           5.7.2     5.9.3    5.9.3  node_modules/typescript                        Next-project-btw
```

---

## 🔒 npm audit

```
合計 57 件の脆弱性が検出されました

critical : 5
high     : 17
moderate : 24
low      : 11
info     : 0

----------------------------------------

■ @babel/helpers [MODERATE]
  影響バージョン: <7.26.10
  Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups
  https://github.com/advisories/GHSA-968p-4wvh-cqc8
  修正: npm audit fix で対応可能

■ @babel/runtime [MODERATE]
  影響バージョン: <7.26.10
  Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups
  https://github.com/advisories/GHSA-968p-4wvh-cqc8
  修正: npm audit fix で対応可能

■ @next/eslint-plugin-next [HIGH]
  影響バージョン: 14.0.5-canary.0 - 15.0.0-rc.1
  修正: eslint-config-next@16.2.1 へのアップデートが必要

■ @storybook/addon-controls [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/addon-docs [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/addon-essentials [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/addon-essentials@8.6.14 へのアップデートが必要

■ @storybook/addon-onboarding [MODERATE]
  影響バージョン: 0.0.20--canary.40.25bbf96.0 - 0.0.20--canary.42.babf260.0 || 0.0.29--canary.40.3282e5c.0 - 0.0.29--canary.40.69103b8.0 || 0.0.30-canary.40.9cbd35d.0 - 2.0.0-next.2
  修正: @storybook/addon-onboarding@10.3.1 へのアップデートが必要

■ @storybook/blocks [MODERATE]
  影響バージョン: <=8.2.0-beta.3
  修正: @storybook/blocks@8.6.14 へのアップデートが必要

■ @storybook/builder-manager [MODERATE]
  影響バージョン: <=8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/builder-webpack5 [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/cli [HIGH]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3 || 8.3.0-alpha.0 - 10.0.0-rc.4
  修正: npm audit fix で対応可能

■ @storybook/core-common [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ @storybook/core-server [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/core-webpack [MODERATE]
  影響バージョン: <=8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/docs-tools [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/blocks@8.6.14 へのアップデートが必要

■ @storybook/nextjs [MODERATE]
  影響バージョン: *
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ @storybook/preset-react-webpack [MODERATE]
  影響バージョン: <=8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/react [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/react@10.3.1 へのアップデートが必要

■ @storybook/telemetry [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/addon-onboarding@10.3.1 へのアップデートが必要

■ @typescript-eslint/parser [HIGH]
  影響バージョン: 6.16.0 - 7.5.0
  修正: npm audit fix で対応可能

■ @typescript-eslint/typescript-estree [HIGH]
  影響バージョン: 6.16.0 - 7.5.0
  修正: npm audit fix で対応可能

■ ajv [MODERATE]
  影響バージョン: <6.14.0 || >=7.0.0-alpha.0 <8.18.0
  ajv has ReDoS when using `$data` option
  https://github.com/advisories/GHSA-2g4f-4pwh-qvx6
  ajv has ReDoS when using `$data` option
  https://github.com/advisories/GHSA-2g4f-4pwh-qvx6
  修正: npm audit fix で対応可能

■ axios [HIGH]
  影響バージョン: 1.0.0 - 1.13.4
  axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL
  https://github.com/advisories/GHSA-jr5f-v2jv-69x6
  Axios is vulnerable to DoS attack through lack of data size check
  https://github.com/advisories/GHSA-4hjh-wcwx-xvwj
  Axios is Vulnerable to Denial of Service via __proto__ Key in mergeConfig
  https://github.com/advisories/GHSA-43fc-jf86-j433
  修正: npm audit fix で対応可能

■ bn.js [MODERATE]
  影響バージョン: >=5.0.0 <5.2.3 || <4.12.3
  bn.js affected by an infinite loop
  https://github.com/advisories/GHSA-378v-28hj-76wf
  bn.js affected by an infinite loop
  https://github.com/advisories/GHSA-378v-28hj-76wf
  修正: npm audit fix で対応可能

■ body-parser [LOW]
  影響バージョン: 1.19.0 - 1.20.3 || 2.0.0-beta.1 - 2.0.2
  修正: npm audit fix で対応可能

■ brace-expansion [LOW]
  影響バージョン: 1.0.0 - 1.1.11 || 2.0.0 - 2.0.1
  brace-expansion Regular Expression Denial of Service vulnerability
  https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
  brace-expansion Regular Expression Denial of Service vulnerability
  https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
  修正: npm audit fix で対応可能

■ browserify-sign [LOW]
  影響バージョン: >=2.4.0
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ compression [LOW]
  影響バージョン: 1.0.3 - 1.8.0
  修正: npm audit fix で対応可能

■ create-ecdh [LOW]
  影響バージョン: *
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ crypto-browserify [LOW]
  影響バージョン: >=3.4.0
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ elliptic [LOW]
  影響バージョン: *
  Elliptic Uses a Cryptographic Primitive with a Risky Implementation
  https://github.com/advisories/GHSA-848j-6mx2-7j84
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ esbuild [MODERATE]
  影響バージョン: <=0.24.2
  esbuild enables any website to send any requests to the development server and read the response
  https://github.com/advisories/GHSA-67mh-4wv8-2f99
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ eslint-config-next [HIGH]
  影響バージョン: 14.0.5-canary.0 - 15.0.0-rc.1
  修正: eslint-config-next@16.2.1 へのアップデートが必要

■ express [LOW]
  影響バージョン: 4.17.0 - 4.21.2 || 5.0.0-alpha.1 - 5.0.1
  修正: npm audit fix で対応可能

■ flatted [HIGH]
  影響バージョン: <=3.4.1
  flatted vulnerable to unbounded recursion DoS in parse() revive phase
  https://github.com/advisories/GHSA-25h7-pfq9-p65f
  Prototype Pollution via parse() in NodeJS flatted
  https://github.com/advisories/GHSA-rf6f-7fwh-wjgh
  修正: npm audit fix で対応可能

■ form-data [CRITICAL]
  影響バージョン: 4.0.0 - 4.0.3
  form-data uses unsafe random function in form-data for choosing boundary
  https://github.com/advisories/GHSA-fjxv-7rqg-78g4
  修正: npm audit fix で対応可能

■ giget [HIGH]
  影響バージョン: 0.0.1 - 1.2.5
  修正: npm audit fix で対応可能

■ glob [HIGH]
  影響バージョン: 10.2.0 - 10.4.5
  glob CLI: Command injection via -c/--cmd executes matches with shell:true
  https://github.com/advisories/GHSA-5j98-mcp5-4vw2
  修正: eslint-config-next@16.2.1 へのアップデートが必要

■ image-size [HIGH]
  影響バージョン: 1.1.0 - 1.2.0
  image-size Denial of Service via Infinite Loop during Image Processing
  https://github.com/advisories/GHSA-m5qc-5hw7-8vg7
  修正: npm audit fix で対応可能

■ immutable [HIGH]
  影響バージョン: 5.0.0 - 5.1.4
  Immutable is vulnerable to Prototype Pollution
  https://github.com/advisories/GHSA-wf6x-7x77-mvgw
  修正: npm audit fix で対応可能

■ js-yaml [MODERATE]
  影響バージョン: <3.14.2 || >=4.0.0 <4.1.1
  js-yaml has prototype pollution in merge (<<)
  https://github.com/advisories/GHSA-mh29-5h37-fv8m
  js-yaml has prototype pollution in merge (<<)
  https://github.com/advisories/GHSA-mh29-5h37-fv8m
  修正: npm audit fix で対応可能

■ lodash [MODERATE]
  影響バージョン: 4.0.0 - 4.17.21
  Lodash has Prototype Pollution Vulnerability in `_.unset` and `_.omit` functions
  https://github.com/advisories/GHSA-xxjr-mmjv-4gpg
  修正: npm audit fix で対応可能

■ minimatch [HIGH]
  影響バージョン: <=3.1.3 || 5.0.0 - 5.1.7 || 9.0.0 - 9.0.6
  minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern
  https://github.com/advisories/GHSA-3ppc-4f35-3m26
  minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern
  https://github.com/advisories/GHSA-3ppc-4f35-3m26
  minimatch has a ReDoS via repeated wildcards with non-matching literal in pattern
  https://github.com/advisories/GHSA-3ppc-4f35-3m26
  minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments
  https://github.com/advisories/GHSA-7r86-cg39-jmmj
  minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments
  https://github.com/advisories/GHSA-7r86-cg39-jmmj
  minimatch has ReDoS: matchOne() combinatorial backtracking via multiple non-adjacent GLOBSTAR segments
  https://github.com/advisories/GHSA-7r86-cg39-jmmj
  minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regular expressions
  https://github.com/advisories/GHSA-23c5-xmqv-rm74
  minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regular expressions
  https://github.com/advisories/GHSA-23c5-xmqv-rm74
  minimatch ReDoS: nested *() extglobs generate catastrophically backtracking regular expressions
  https://github.com/advisories/GHSA-23c5-xmqv-rm74
  修正: npm audit fix で対応可能

■ next [CRITICAL]
  影響バージョン: 0.9.9 - 15.5.13
  Next.js Server-Side Request Forgery in Server Actions
  https://github.com/advisories/GHSA-fr5h-rqp8-mj6g
  Next.js Cache Poisoning
  https://github.com/advisories/GHSA-gp8f-8m3g-qvj9
  Denial of Service condition in Next.js image optimization
  https://github.com/advisories/GHSA-g77x-44xx-532m
  Next.js Allows a Denial of Service (DoS) with Server Actions
  https://github.com/advisories/GHSA-7m27-7ghc-44w9
  Information exposure in Next.js dev server due to lack of origin verification
  https://github.com/advisories/GHSA-3h52-269p-cp9r
  Next.js Affected by Cache Key Confusion for Image Optimization API Routes
  https://github.com/advisories/GHSA-g5qg-72qw-gw5v
  Next.js authorization bypass vulnerability
  https://github.com/advisories/GHSA-7gfc-8cq8-jh5f
  Next.js Improper Middleware Redirect Handling Leads to SSRF
  https://github.com/advisories/GHSA-4342-x723-ch2f
  Next.js Content Injection Vulnerability for Image Optimization
  https://github.com/advisories/GHSA-xv57-4mr9-wg8v
  Next.js Race Condition to Cache Poisoning
  https://github.com/advisories/GHSA-qpjv-v59x-3qc4
  Next Vulnerable to Denial of Service with Server Components
  https://github.com/advisories/GHSA-mwv6-3258-q52c
  Next has a Denial of Service with Server Components - Incomplete Fix Follow-Up
  https://github.com/advisories/GHSA-5j59-xgg2-r9c4
  Next.js self-hosted applications vulnerable to DoS via Image Optimizer remotePatterns configuration
  https://github.com/advisories/GHSA-9g9p-9gw9-jx7f
  Next.js HTTP request deserialization can lead to DoS when using insecure React Server Components
  https://github.com/advisories/GHSA-h25m-26qc-wcjf
  Authorization Bypass in Next.js Middleware
  https://github.com/advisories/GHSA-f82v-jwr5-mffw
  Next.js: HTTP request smuggling in rewrites
  https://github.com/advisories/GHSA-ggv3-7p47-pfv8
  Next.js: Unbounded next/image disk cache growth can exhaust storage
  https://github.com/advisories/GHSA-3x4c-7xq6-9pq8
  修正: next@14.2.35 へのアップデートが必要

■ node-polyfill-webpack-plugin [LOW]
  影響バージョン: <=4.0.0
  修正: @storybook/nextjs@10.3.1 へのアップデートが必要

■ on-headers [LOW]
  影響バージョン: <1.1.0
  on-headers is vulnerable to http response header manipulation
  https://github.com/advisories/GHSA-76c9-3jph-rj3q
  修正: npm audit fix で対応可能

■ pbkdf2 [CRITICAL]
  影響バージョン: 3.0.3 - 3.1.2
  pbkdf2 returns predictable uninitialized/zero-filled memory for non-normalized or unimplemented algos
  https://github.com/advisories/GHSA-h7cp-r72f-jxh6
  pbkdf2 silently disregards Uint8Array input, returning static keys
  https://github.com/advisories/GHSA-v62p-rq8g-8h59
  修正: npm audit fix で対応可能

■ qs [MODERATE]
  影響バージョン: <=6.14.1
  qs's arrayLimit bypass in comma parsing allows denial of service
  https://github.com/advisories/GHSA-w7fw-mjwx-w883
  qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion
  https://github.com/advisories/GHSA-6rw7-vpxm-498p
  修正: npm audit fix で対応可能

■ serialize-javascript [HIGH]
  影響バージョン: <=7.0.2
  Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.toISOString()
  https://github.com/advisories/GHSA-5c6j-r48x-rmvq
  修正: npm audit fix で対応可能

■ sha.js [CRITICAL]
  影響バージョン: <=2.4.11
  sha.js is missing type checks leading to hash rewind and passing on crafted data
  https://github.com/advisories/GHSA-95m3-7q98-8xr5
  修正: npm audit fix で対応可能

■ store2 [MODERATE]
  影響バージョン: <2.14.4
  Cross Site Scripting vulnerability in store2
  https://github.com/advisories/GHSA-w5hq-hm5m-4548
  修正: npm audit fix で対応可能

■ storybook [HIGH]
  影響バージョン: <=0.0.0-pr-34235-sha-a7c7a978 || 6.5.17-alpha.0 - 8.2.0-beta.3
  Storybook manager bundle may expose environment variables during build
  https://github.com/advisories/GHSA-8452-54wp-rmv6
  修正: npm audit fix で対応可能

■ swiper [CRITICAL]
  影響バージョン: 6.5.1 - 12.1.1
  Prototype pollution in swiper
  https://github.com/advisories/GHSA-hmx5-qpq5-p643
  修正: swiper@12.1.2 へのアップデートが必要

■ tar [HIGH]
  影響バージョン: <=7.5.10
  node-tar Vulnerable to Arbitrary File Creation/Overwrite via Hardlink Path Traversal
  https://github.com/advisories/GHSA-34x7-hfp2-rc4v
  node-tar is Vulnerable to Arbitrary File Overwrite and Symlink Poisoning via Insufficient Path Sanitization
  https://github.com/advisories/GHSA-8qq5-rm4j-mr97
  Arbitrary File Read/Write via Hardlink Target Escape Through Symlink Chain in node-tar Extraction
  https://github.com/advisories/GHSA-83g3-92jg-28cx
  tar has Hardlink Path Traversal via Drive-Relative Linkpath
  https://github.com/advisories/GHSA-qffp-2rhf-9h96
  node-tar Symlink Path Traversal via Drive-Relative Linkpath
  https://github.com/advisories/GHSA-9ppj-qmqm-q256
  Race Condition in node-tar Path Reservations via Unicode Ligature Collisions on macOS APFS
  https://github.com/advisories/GHSA-r6q2-hw4h-h46w
  修正: npm audit fix で対応可能

■ tar-fs [HIGH]
  影響バージョン: 2.0.0 - 2.1.3 || 3.0.0 - 3.1.0
  tar-fs has a symlink validation bypass if destination directory is predictable with a specific tarball
  https://github.com/advisories/GHSA-vj76-c3g6-qr5v
  tar-fs has a symlink validation bypass if destination directory is predictable with a specific tarball
  https://github.com/advisories/GHSA-vj76-c3g6-qr5v
  tar-fs can extract outside the specified dir with a specific tarball
  https://github.com/advisories/GHSA-8cj5-5rvv-wf4v
  tar-fs can extract outside the specified dir with a specific tarball
  https://github.com/advisories/GHSA-8cj5-5rvv-wf4v
  tar-fs Vulnerable to Link Following and Path Traversal via Extracting a Crafted tar File
  https://github.com/advisories/GHSA-pq67-2wwv-3xjx
  tar-fs Vulnerable to Link Following and Path Traversal via Extracting a Crafted tar File
  https://github.com/advisories/GHSA-pq67-2wwv-3xjx
  修正: npm audit fix で対応可能

■ terser-webpack-plugin [HIGH]
  影響バージョン: <=5.3.16
  修正: npm audit fix で対応可能

■ webpack [LOW]
  影響バージョン: 5.49.0 - 5.104.0
  webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to build-time SSRF behavior
  https://github.com/advisories/GHSA-8fgc-7cc6-rx7x
  webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + cache persistence
  https://github.com/advisories/GHSA-38r7-794h-5758
  修正: npm audit fix で対応可能
```
