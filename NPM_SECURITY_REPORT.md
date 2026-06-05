# 🩺 依存関係ヘルスレポート

> 🍨 **KAITO**: 依存関係のヘルスチェック完了だよ！僕と一緒に確認してみよう！🍨

**実行日時**: 2026/06/06 02:58:51 JST

---

## 📦 npm outdated

```
Package                            Current    Wanted   Latest  Location                                       Depended by
@emotion/styled                    11.14.0   11.14.1  11.14.1  node_modules/@emotion/styled                   Next-project-btw
@mui/icons-material                5.16.13    5.18.0    9.0.1  node_modules/@mui/icons-material               Next-project-btw
@mui/material                      5.16.13    5.18.0    9.0.1  node_modules/@mui/material                     Next-project-btw
@storybook/addon-essentials         7.6.20    7.6.24   8.6.14  node_modules/@storybook/addon-essentials       Next-project-btw
@storybook/addon-interactions       7.6.20    7.6.24   8.6.14  node_modules/@storybook/addon-interactions     Next-project-btw
@storybook/addon-links              7.6.20    7.6.24   10.4.2  node_modules/@storybook/addon-links            Next-project-btw
@storybook/addon-onboarding         1.0.11    1.0.11   10.4.2  node_modules/@storybook/addon-onboarding       Next-project-btw
@storybook/addon-viewport           7.6.20    7.6.24    9.0.8  node_modules/@storybook/addon-viewport         Next-project-btw
@storybook/blocks                   7.6.20    7.6.24   8.6.14  node_modules/@storybook/blocks                 Next-project-btw
@storybook/nextjs                   7.6.20    7.6.24   10.4.2  node_modules/@storybook/nextjs                 Next-project-btw
@storybook/react                    7.6.20    7.6.24   10.4.2  node_modules/@storybook/react                  Next-project-btw
@storybook/test                     7.6.20    7.6.24   8.6.15  node_modules/@storybook/test                   Next-project-btw
@types/node                       20.17.10  20.19.41   25.9.1  node_modules/@types/node                       Next-project-btw
@types/react                       18.3.18   18.3.30  19.2.16  node_modules/@types/react                      Next-project-btw
@types/react-dom                    18.3.5    18.3.7   19.2.3  node_modules/@types/react-dom                  Next-project-btw
@types/yargs                       17.0.33   17.0.35  17.0.35  node_modules/@types/yargs                      Next-project-btw
@typescript-eslint/eslint-plugin    8.18.2    8.60.1   8.60.1  node_modules/@typescript-eslint/eslint-plugin  Next-project-btw
@typescript-eslint/parser           8.18.2    8.60.1   8.60.1  node_modules/@typescript-eslint/parser         Next-project-btw
axios                                1.7.9    1.17.0   1.17.0  node_modules/axios                             Next-project-btw
eslint                              8.57.1    8.57.1   10.4.1  node_modules/eslint                            Next-project-btw
eslint-config-next                  14.2.4    14.2.4   16.2.7  node_modules/eslint-config-next                Next-project-btw
eslint-config-prettier               9.1.0     9.1.2   10.1.8  node_modules/eslint-config-prettier            Next-project-btw
eslint-plugin-import                2.31.0    2.32.0   2.32.0  node_modules/eslint-plugin-import              Next-project-btw
eslint-plugin-prettier               5.2.1     5.5.6    5.5.6  node_modules/eslint-plugin-prettier            Next-project-btw
eslint-plugin-simple-import-sort    12.1.1    12.1.1   13.0.0  node_modules/eslint-plugin-simple-import-sort  Next-project-btw
eslint-plugin-storybook             0.6.15    0.6.15   10.4.2  node_modules/eslint-plugin-storybook           Next-project-btw
eslint-plugin-unused-imports         4.1.4     4.4.1    4.4.1  node_modules/eslint-plugin-unused-imports      Next-project-btw
i18next                            23.16.8   23.16.8   26.3.1  node_modules/i18next                           Next-project-btw
next                                14.0.3    14.0.3   16.2.7  node_modules/next                              Next-project-btw
next-i18next                        15.4.1    15.4.3   16.0.7  node_modules/next-i18next                      Next-project-btw
prettier                             3.4.2     3.8.3    3.8.3  node_modules/prettier                          Next-project-btw
react                               18.3.1    18.3.1   19.2.7  node_modules/react                             Next-project-btw
react-dom                           18.3.1    18.3.1   19.2.7  node_modules/react-dom                         Next-project-btw
sass                                1.83.0   1.100.0  1.100.0  node_modules/sass                              Next-project-btw
storybook                           7.6.20    7.6.24   10.4.2  node_modules/storybook                         Next-project-btw
swiper                             11.1.15   11.2.10   12.2.0  node_modules/swiper                            Next-project-btw
typescript                           5.7.2     5.9.3    6.0.3  node_modules/typescript                        Next-project-btw
```

---

## 🔒 npm audit

```
合計 70 件の脆弱性が検出されました

critical : 6
high     : 24
moderate : 32
low      : 8
info     : 0

----------------------------------------

■ @babel/helpers [MODERATE]
  影響バージョン: <7.26.10
  Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups
  https://github.com/advisories/GHSA-968p-4wvh-cqc8
  修正: npm audit fix で対応可能

■ @babel/plugin-transform-modules-systemjs [HIGH]
  影響バージョン: 7.12.0 - 7.29.0
  @babel/plugin-transform-modules-systemjs generates arbitrary code when compiling malicious input
  https://github.com/advisories/GHSA-fv7c-fp4j-7gwp
  修正: npm audit fix で対応可能

■ @babel/runtime [MODERATE]
  影響バージョン: <7.26.10
  Babel has inefficient RegExp complexity in generated code with .replace when transpiling named capturing groups
  https://github.com/advisories/GHSA-968p-4wvh-cqc8
  修正: npm audit fix で対応可能

■ @next/eslint-plugin-next [HIGH]
  影響バージョン: 14.0.5-canary.0 - 15.0.0-rc.1
  修正: eslint-config-next@16.2.7 へのアップデートが必要

■ @storybook/addon-actions [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 3.1.6 - 6.2.0-rc.13 || 7.0.7 - 9.0.0-rc.5
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ @storybook/addon-controls [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/addon-docs [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/addon-essentials [MODERATE]
  影響バージョン: <=5.3.0-rc.14 || 6.0.0-alpha.0 - 6.2.0-rc.13 || 6.5.17-alpha.0 - 9.0.0-alpha.3
  修正: @storybook/addon-essentials@8.6.14 へのアップデートが必要

■ @storybook/addon-onboarding [MODERATE]
  影響バージョン: 0.0.19--canary.33.684ad81.0 - 0.0.19--canary.40.e7afff4.0 || 0.0.20--canary.40.25bbf96.0 - 0.0.20--canary.42.babf260.0 || 0.0.29--canary.40.3282e5c.0 - 0.0.29--canary.40.69103b8.0 || 0.0.30-canary.40.9cbd35d.0 - 2.0.0-next.2
  修正: @storybook/addon-onboarding@10.4.2 へのアップデートが必要

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
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

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
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ @storybook/preset-react-webpack [MODERATE]
  影響バージョン: <=8.2.0-beta.3
  修正: npm audit fix で対応可能

■ @storybook/react [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/react@10.4.2 へのアップデートが必要

■ @storybook/telemetry [MODERATE]
  影響バージョン: <=0.0.0-pr-34011-sha-c45b0f3f || 6.5.17-alpha.0 - 8.2.0-beta.3
  修正: @storybook/addon-onboarding@10.4.2 へのアップデートが必要

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
  影響バージョン: 1.0.0 - 1.15.2
  axios Requests Vulnerable To Possible SSRF and Credential Leakage via Absolute URL
  https://github.com/advisories/GHSA-jr5f-v2jv-69x6
  Axios is vulnerable to DoS attack through lack of data size check
  https://github.com/advisories/GHSA-4hjh-wcwx-xvwj
  Axios has a NO_PROXY Hostname Normalization Bypass that Leads to SSRF
  https://github.com/advisories/GHSA-3p68-rc4w-qgx5
  Axios: Authentication Bypass via Prototype Pollution Gadget in `validateStatus` Merge Strategy
  https://github.com/advisories/GHSA-w9j2-pvgh-6h63
  Axios: Incomplete Fix for CVE-2025-62718 — NO_PROXY Protection Bypassed via RFC 1122 Loopback Subnet (127.0.0.0/8) in Axios 1.15.0
  https://github.com/advisories/GHSA-pmwg-cvhr-8vh7
  Axios: Invisible JSON Response Tampering via Prototype Pollution Gadget in `parseReviver`
  https://github.com/advisories/GHSA-3w6x-2g7m-8v23
  Axios: Null Byte Injection via Reverse-Encoding in AxiosURLSearchParams
  https://github.com/advisories/GHSA-xhjh-pmcv-23jw
  Axios: CRLF Injection in multipart/form-data body via unsanitized blob.type in formDataToStream
  https://github.com/advisories/GHSA-445q-vr5w-6q77
  Axios: no_proxy bypass via IP alias allows SSRF
  https://github.com/advisories/GHSA-m7pr-hjqh-92cm
  Axios: unbounded recursion in toFormData causes DoS via deeply nested request data
  https://github.com/advisories/GHSA-62hf-57xw-28j9
  Axios' HTTP adapter-streamed uploads bypass maxBodyLength when maxRedirects: 0
  https://github.com/advisories/GHSA-5c9x-8gcm-mpgx
  Axios: HTTP adapter streamed responses bypass maxContentLength
  https://github.com/advisories/GHSA-vf2m-468p-8v99
  Axios: Prototype Pollution Gadgets - Response Tampering, Data Exfiltration, and Request Hijacking
  https://github.com/advisories/GHSA-pf86-5x62-jrwf
  Axios: Header Injection via Prototype Pollution
  https://github.com/advisories/GHSA-6chq-wfr3-2hj9
  Axios: XSRF Token Cross-Origin Leakage via Prototype Pollution Gadget in `withXSRFToken` Boolean Coercion
  https://github.com/advisories/GHSA-xx6v-rp6x-q39c
  Axios is Vulnerable to Denial of Service via __proto__ Key in mergeConfig
  https://github.com/advisories/GHSA-43fc-jf86-j433
  Axios has prototype pollution read-side gadgets in HTTP adapter that allow credential injection and request hijacking
  https://github.com/advisories/GHSA-q8qp-cvcw-x6jj
  Axios has Unrestricted Cloud Metadata Exfiltration via Header Injection Chain
  https://github.com/advisories/GHSA-fvcv-3m26-pcqx
  axios's shouldBypassProxy does not recognize IPv4-mapped IPv6 addresses, allowing NO_PROXY bypass (incomplete fix for CVE-2025-62718)
  https://github.com/advisories/GHSA-pjwm-pj3p-43mv
  axios has DoS & Header Injection via Prototype Pollution Read-Side Gadgets in axios merge functions
  https://github.com/advisories/GHSA-898c-q2cr-xwhg
  axios Vulnerable to Credential Theft and Response Hijacking via Prototype Pollution Gadget in Config Merge
  https://github.com/advisories/GHSA-3g43-6gmg-66jw
  axios Vulnerable to Full Man-in-the-Middle via Prototype Pollution Gadget in `config.proxy`
  https://github.com/advisories/GHSA-35jp-ww65-95wh
  Axios: Regular Expression Denial of Service (ReDoS) via Cookie Name Injection
  https://github.com/advisories/GHSA-hfxv-24rg-xrqf
  Allocation of Resources Without Limits or Throttling in Axios
  https://github.com/advisories/GHSA-777c-7fjr-54vf
  Axios: Proxy-Authorization Credential Leak to Origin Server Across HTTP-to-HTTPS Redirect in Axios Node.js HTTP Adapter
  https://github.com/advisories/GHSA-p92q-9vqr-4j8v
  Axios: Proxy-Authorization header leaks to redirect target when proxy is re-evaluated to direct connection
  https://github.com/advisories/GHSA-j5f8-grm9-p9fc
  修正: npm audit fix で対応可能

■ bn.js [MODERATE]
  影響バージョン: >=5.0.0 <5.2.3 || <4.12.3
  bn.js affected by an infinite loop
  https://github.com/advisories/GHSA-378v-28hj-76wf
  bn.js affected by an infinite loop
  https://github.com/advisories/GHSA-378v-28hj-76wf
  修正: npm audit fix で対応可能

■ body-parser [MODERATE]
  影響バージョン: 1.20.3 - 1.20.4 || 2.0.0-beta.1 - 2.0.2
  修正: npm audit fix で対応可能

■ brace-expansion [MODERATE]
  影響バージョン: <=1.1.12 || 2.0.0 - 2.0.2
  brace-expansion Regular Expression Denial of Service vulnerability
  https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
  brace-expansion Regular Expression Denial of Service vulnerability
  https://github.com/advisories/GHSA-v6h2-p8h4-qcjw
  brace-expansion: Zero-step sequence causes process hang and memory exhaustion
  https://github.com/advisories/GHSA-f886-m6hf-6m8v
  brace-expansion: Zero-step sequence causes process hang and memory exhaustion
  https://github.com/advisories/GHSA-f886-m6hf-6m8v
  修正: npm audit fix で対応可能

■ browserify-sign [LOW]
  影響バージョン: >=2.4.0
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ compression [LOW]
  影響バージョン: 1.0.3 - 1.8.0
  修正: npm audit fix で対応可能

■ create-ecdh [LOW]
  影響バージョン: *
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ crypto-browserify [LOW]
  影響バージョン: >=3.4.0
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ defu [HIGH]
  影響バージョン: <=6.1.4
  defu: Prototype pollution via `__proto__` key in defaults argument
  https://github.com/advisories/GHSA-737v-mqg7-c878
  修正: npm audit fix で対応可能

■ elliptic [LOW]
  影響バージョン: *
  Elliptic Uses a Cryptographic Primitive with a Risky Implementation
  https://github.com/advisories/GHSA-848j-6mx2-7j84
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ esbuild [MODERATE]
  影響バージョン: <=0.24.2
  esbuild enables any website to send any requests to the development server and read the response
  https://github.com/advisories/GHSA-67mh-4wv8-2f99
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ eslint-config-next [HIGH]
  影響バージョン: 14.0.5-canary.0 - 15.0.0-rc.1
  修正: eslint-config-next@16.2.7 へのアップデートが必要

■ express [HIGH]
  影響バージョン: 4.0.0-rc1 - 4.22.1 || 5.0.0-alpha.1 - 5.0.1
  修正: npm audit fix で対応可能

■ fast-uri [HIGH]
  影響バージョン: <=3.1.1
  fast-uri vulnerable to path traversal via percent-encoded dot segments
  https://github.com/advisories/GHSA-q3j6-qgpj-74h6
  fast-uri vulnerable to host confusion via percent-encoded authority delimiters
  https://github.com/advisories/GHSA-v39h-62p7-jpjc
  修正: npm audit fix で対応可能

■ flatted [HIGH]
  影響バージョン: <=3.4.1
  flatted vulnerable to unbounded recursion DoS in parse() revive phase
  https://github.com/advisories/GHSA-25h7-pfq9-p65f
  Prototype Pollution via parse() in NodeJS flatted
  https://github.com/advisories/GHSA-rf6f-7fwh-wjgh
  修正: npm audit fix で対応可能

■ follow-redirects [MODERATE]
  影響バージョン: <=1.15.11
  follow-redirects leaks Custom Authentication Headers to Cross-Domain Redirect Targets
  https://github.com/advisories/GHSA-r4q5-vmmm-2653
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
  修正: eslint-config-next@16.2.7 へのアップデートが必要

■ handlebars [CRITICAL]
  影響バージョン: 4.0.0 - 4.7.8
  Handlebars.js has JavaScript Injection via AST Type Confusion by tampering @partial-block
  https://github.com/advisories/GHSA-3mfm-83xf-c92r
  Handlebars.js has JavaScript Injection via AST Type Confusion
  https://github.com/advisories/GHSA-2w6w-674q-4c4q
  Handlebars.js has Prototype Pollution Leading to XSS through Partial Template Injection
  https://github.com/advisories/GHSA-2qvq-rjwj-gvw9
  Handlebars.js has a Prototype Method Access Control Gap via Missing __lookupSetter__ Blocklist Entry
  https://github.com/advisories/GHSA-7rx3-28cr-v5wh
  Handlebars.js has a Property Access Validation Bypass in container.lookup
  https://github.com/advisories/GHSA-442j-39wm-28r2
  Handlebars.js has JavaScript Injection via AST Type Confusion when passing an object as dynamic partial
  https://github.com/advisories/GHSA-xhpv-hc6g-r9c6
  Handlebars.js has Denial of Service via Malformed Decorator Syntax in Template Compilation
  https://github.com/advisories/GHSA-9cx6-37pm-9jff
  Handlebars.js has JavaScript Injection in CLI Precompiler via Unescaped Names and Options
  https://github.com/advisories/GHSA-xjpj-3mr7-gcpf
  修正: npm audit fix で対応可能

■ i18next-fs-backend [HIGH]
  影響バージョン: <2.6.4
  i18next-fs-backend: Path traversal via unsanitised lng/ns allows arbitrary file read/overwrite
  https://github.com/advisories/GHSA-8847-338w-5hcj
  修正: npm audit fix で対応可能

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

■ lodash [HIGH]
  影響バージョン: <=4.17.23
  Lodash has Prototype Pollution Vulnerability in `_.unset` and `_.omit` functions
  https://github.com/advisories/GHSA-xxjr-mmjv-4gpg
  lodash vulnerable to Code Injection via `_.template` imports key names
  https://github.com/advisories/GHSA-r5fr-rjxr-66jc
  lodash vulnerable to Prototype Pollution via array path bypass in `_.unset` and `_.omit`
  https://github.com/advisories/GHSA-f23m-r3pf-42rh
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
  影響バージョン: 0.9.9 - 16.3.0-canary.5
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
  Next.js has a Denial of Service with Server Components
  https://github.com/advisories/GHSA-q4gf-8mx6-v5v3
  Next.js Vulnerable to Denial of Service with Server Components
  https://github.com/advisories/GHSA-8h8q-6873-q5fj
  Next.js's Middleware / Proxy redirects can be cache-poisoned
  https://github.com/advisories/GHSA-3g8h-86w9-wvmq
  Next.js vulnerable to cross-site scripting in App Router applications using CSP nonces
  https://github.com/advisories/GHSA-ffhc-5mcf-pf4q
  Next.js vulnerable to cache poisoning via collisions in React Server Component cache-busting
  https://github.com/advisories/GHSA-vfv6-92ff-j949
  Next.js has cross-site scripting in beforeInteractive scripts with untrusted input
  https://github.com/advisories/GHSA-gx5p-jg67-6x7h
  Next.js has a Denial of Service in the Image Optimization API
  https://github.com/advisories/GHSA-h64f-5h5j-jqjh
  Next.js vulnerable to server-side request forgery in applications using WebSocket upgrades
  https://github.com/advisories/GHSA-c4j6-fc7j-m34r
  Next.js has a Middleware / Proxy bypass in Pages Router applications using i18n
  https://github.com/advisories/GHSA-36qx-fr4f-26g5
  修正: next@14.2.35 へのアップデートが必要

■ node-polyfill-webpack-plugin [LOW]
  影響バージョン: <=4.0.0
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ on-headers [LOW]
  影響バージョン: <1.1.0
  on-headers is vulnerable to http response header manipulation
  https://github.com/advisories/GHSA-76c9-3jph-rj3q
  修正: npm audit fix で対応可能

■ path-to-regexp [HIGH]
  影響バージョン: <0.1.13
  path-to-regexp vulnerable to Regular Expression Denial of Service via multiple route parameters
  https://github.com/advisories/GHSA-37ch-88jc-xwx2
  修正: npm audit fix で対応可能

■ pbkdf2 [CRITICAL]
  影響バージョン: 3.0.3 - 3.1.2
  pbkdf2 returns predictable uninitialized/zero-filled memory for non-normalized or unimplemented algos
  https://github.com/advisories/GHSA-h7cp-r72f-jxh6
  pbkdf2 silently disregards Uint8Array input, returning static keys
  https://github.com/advisories/GHSA-v62p-rq8g-8h59
  修正: npm audit fix で対応可能

■ picomatch [HIGH]
  影響バージョン: <=2.3.1
  Picomatch: Method Injection in POSIX Character Classes causes incorrect Glob Matching
  https://github.com/advisories/GHSA-3v7f-55p6-f55p
  Picomatch has a ReDoS vulnerability via extglob quantifiers
  https://github.com/advisories/GHSA-c2c7-rcm5-vvqj
  修正: npm audit fix で対応可能

■ postcss [MODERATE]
  影響バージョン: <8.5.10
  PostCSS has XSS via Unescaped </style> in its CSS Stringify Output
  https://github.com/advisories/GHSA-qx2v-qp2m-jg93
  修正: next@14.2.35 へのアップデートが必要

■ qs [MODERATE]
  影響バージョン: <=6.15.1
  qs's arrayLimit bypass in comma parsing allows denial of service
  https://github.com/advisories/GHSA-w7fw-mjwx-w883
  qs's arrayLimit bypass in its bracket notation allows DoS via memory exhaustion
  https://github.com/advisories/GHSA-6rw7-vpxm-498p
  qs has a remotely triggerable DoS: qs.stringify crashes with TypeError on null/undefined entries in comma-format arrays when encodeValuesOnly is set
  https://github.com/advisories/GHSA-q8mj-m7cp-5q26
  修正: npm audit fix で対応可能

■ serialize-javascript [HIGH]
  影響バージョン: <=7.0.4
  Serialize JavaScript is Vulnerable to RCE via RegExp.flags and Date.prototype.toISOString()
  https://github.com/advisories/GHSA-5c6j-r48x-rmvq
  Serialize JavaScript has CPU Exhaustion Denial of Service via crafted array-like objects
  https://github.com/advisories/GHSA-qj8w-gfj5-8c6v
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
  影響バージョン: <=0.0.0-pr-35051-sha-92d9e51a || 6.5.17-alpha.0 - 8.2.0-beta.3
  Storybook manager bundle may expose environment variables during build
  https://github.com/advisories/GHSA-8452-54wp-rmv6
  修正: npm audit fix で対応可能

■ swiper [CRITICAL]
  影響バージョン: 6.5.1 - 12.1.1
  Prototype pollution in swiper
  https://github.com/advisories/GHSA-hmx5-qpq5-p643
  修正: swiper@12.2.0 へのアップデートが必要

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

■ terser-webpack-plugin [MODERATE]
  影響バージョン: 4.2.1 - 5.3.16
  修正: npm audit fix で対応可能

■ uuid [MODERATE]
  影響バージョン: <11.1.1
  uuid: Missing buffer bounds check in v3/v5/v6 when buf is provided
  https://github.com/advisories/GHSA-w5hq-g745-h8pq
  修正: @storybook/nextjs@10.4.2 へのアップデートが必要

■ webpack [LOW]
  影響バージョン: 5.49.0 - 5.104.0
  webpack buildHttp: allowedUris allow-list bypass via URL userinfo (@) leading to build-time SSRF behavior
  https://github.com/advisories/GHSA-8fgc-7cc6-rx7x
  webpack buildHttp HttpUriPlugin allowedUris bypass via HTTP redirects → SSRF + cache persistence
  https://github.com/advisories/GHSA-38r7-794h-5758
  修正: npm audit fix で対応可能

■ ws [MODERATE]
  影響バージョン: 8.0.0 - 8.20.0
  ws: Uninitialized memory disclosure
  https://github.com/advisories/GHSA-58qx-3vcg-4xpx
  修正: npm audit fix で対応可能

■ yaml [MODERATE]
  影響バージョン: 1.0.0 - 1.10.2
  yaml is vulnerable to Stack Overflow via deeply nested YAML collections
  https://github.com/advisories/GHSA-48c2-rrv3-qjmp
  修正: npm audit fix で対応可能
```
