# Publishing and Distribution Guide

This guide explains how to distribute this skill so users can install it with `npx`, and how to optionally provide a Homebrew formula.

## 1) npx Installation (Recommended)

For Vercel Agent Skills style installation, users can install directly from this GitHub repository:

```bash
npx skills add DanSega1/raindrop-io-skill
```

If this repository ever contains multiple skills, users can target this one explicitly:

```bash
npx skills add DanSega1/raindrop-io-skill --skill raindrop-io
```

This is the simplest and most compatible install path for agent clients that support the `skills` CLI.

## 2) Prepare the Repository for Discovery

Before publishing broadly, make sure:

1. `SKILL.md` is in the repository root.
2. The frontmatter in `SKILL.md` stays accurate (`name`, `description`, `license`, `metadata.version`).
3. `README.md` includes a working install command.
4. Validation passes:

```bash
npx --yes --registry=https://registry.npmjs.org skills-ref validate ./
```

## 3) Publish to Vercel Agent Skills Ecosystem

The Vercel docs list official and community skills and use the same `npx skills add ...` install experience.

Practical rollout sequence:

1. Keep this repository public and tagged with clear releases.
2. Ensure your README has the exact install command from section 1.
3. Submit the skill to community directories (such as skills.sh) when submission is available, linking this GitHub repo.
4. Share the exact install command in docs, issues, and release notes.

## 4) Optional Homebrew Distribution

Homebrew is best for command-line tools. A pure instruction skill usually does not need Homebrew, because `npx skills add ...` is enough.

If you still want Homebrew, create a tiny helper CLI first, then package that CLI with a custom tap.

### 4.1 Create a Tap

```bash
brew tap-new DanSega1/skills
```

This creates a repository like `homebrew-skills` under your GitHub account.

### 4.2 Add a Formula (Template)

Create `Formula/raindrop-io-skill.rb` in your tap repo:

```ruby
class RaindropIoSkill < Formula
  desc "Install the raindrop-io agent skill"
  homepage "https://github.com/DanSega1/raindrop-io-skill"
  url "https://github.com/DanSega1/raindrop-io-skill/archive/refs/tags/v1.0.0.tar.gz"
  sha256 "REPLACE_WITH_REAL_SHA256"
  license "MIT"

  depends_on "node"

  def install
    (bin/"raindrop-io-skill-install").write <<~EOS
      #!/bin/bash
      set -euo pipefail
      npx skills add DanSega1/raindrop-io-skill "$@"
    EOS
  end

  test do
    assert_match "raindrop-io-skill-install", shell_output("ls #{bin}")
  end
end
```

### 4.3 Calculate SHA256 for a Release Tarball

```bash
curl -L -o raindrop-io-skill.tar.gz https://github.com/DanSega1/raindrop-io-skill/archive/refs/tags/v1.0.0.tar.gz
shasum -a 256 raindrop-io-skill.tar.gz
```

Update the formula with the checksum, commit, and push the tap.

### 4.4 End-User Homebrew Install

```bash
brew tap DanSega1/skills
brew install raindrop-io-skill
raindrop-io-skill-install
```

## 5) Recommended Approach

For this project today:

- Primary distribution: `npx skills add DanSega1/raindrop-io-skill`
- Optional convenience layer: Homebrew tap only if your audience explicitly asks for brew support

This keeps maintenance low while preserving compatibility with Vercel-style agent skill installs.
