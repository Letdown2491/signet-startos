# Updating the upstream version

This package wraps [Letdown2491/signet](https://github.com/Letdown2491/signet),
vendored as the `signet` git submodule and built into the combined daemon + UI
image by the local `Dockerfile`. "Upstream" here means that source repo, and the
packaged version is determined entirely by **which commit/tag the submodule
points at** — there is no image tag to bump.

## Determining the upstream version

Fetch the latest upstream release tag:

```sh
gh release view -R Letdown2491/signet --json tagName -q .tagName
```

The current pin is the submodule's checked-out commit:

```sh
git -C signet describe --tags
```

## Applying the bump

1. **Move the submodule to the new tag** (the tag must already be pushed
   upstream):

   ```sh
   git -C signet fetch --tags origin
   git -C signet checkout <new tag>        # e.g. v1.10.1
   git add signet                          # stage the new submodule commit
   ```

2. **Advance the version graph** in `startos/versions/`. StartOS computes
   upgrade paths from this graph, so the previously-current version must be kept
   as a node:

   - Copy the existing `current.ts` to a per-version file named for the version
     it holds (e.g. `v1_10_0.ts`), renaming the export to match
     (`export const v1_10_0 = ...`).
   - Edit `current.ts`: set `version` to `<new upstream version>:0` (the `:0` is
     the StartOS package revision — bump it instead if you re-release the same
     upstream version), replace `releaseNotes` with notes for the new release in
     every locale, and keep `migrations.up` as a no-op unless the upgrade needs a
     data migration.
   - In `index.ts`, import the new per-version file and add it to `other`:
     `VersionGraph.of({ current, other: [v1_10_0, ...] })`.

3. **Verify, build, and test:**

   ```sh
   npm run check        # tsc --noEmit
   make                 # builds the image from ./signet and packs the s9pk
   make install         # optional: sideload to a StartOS server to test upgrade
   ```

4. **Commit** the submodule pointer and the version files:

   ```sh
   git add signet startos/versions
   git commit -m "Update to Signet <new upstream version>"
   git push origin main
   ```

The `.s9pk` and other build outputs are gitignored, so the commit is just the
submodule pointer plus `startos/versions/`.
