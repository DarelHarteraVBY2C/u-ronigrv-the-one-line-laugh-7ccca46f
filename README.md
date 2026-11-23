# The One-Line Laugh

![make.fun bounty](https://make.fun/badge/u-ronigrv-the-one-line-laugh-7ccca46f.svg)
![rank](https://make.fun/badge/u-ronigrv-the-one-line-laugh-7ccca46f/DarelHarteraVBY2C/u-ronigrv-the-one-line-laugh-7ccca46f/rank.svg)
![reward](https://make.fun/badge/u-ronigrv-the-one-line-laugh-7ccca46f/DarelHarteraVBY2C/u-ronigrv-the-one-line-laugh-7ccca46f/reward.svg)

Entry for the [The One-Line Laugh](https://make.fun/bounty/u-ronigrv-the-one-line-laugh-7ccca46f) bounty on [make.fun](https://make.fun).

## The entry

> My smartwatch congratulated me on 10,000 steps today — it counted the 47 trips I made to the fridge during one work call.

One funny line, 121 characters — under the 200-character limit. A smartwatch celebrates 10,000 steps, and the twist is that every one of them was a trip to the fridge during a single work call.

## How it works

`main.ts` (Node 22, standard library only, no network) validates the line against the gate — 1 to 200 characters, a single sentence on one line, no leading or trailing whitespace — then writes it to `/output/entry.txt`, where the sealed scorer reads it.

```sh
node main.ts
```
