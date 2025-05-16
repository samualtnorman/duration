let inherit (import <nixpkgs> {}) fetchFromGitHub mkShellNoCC cacert git; in

let fetchNixpkgs =
	{ rev, sha256 ? "" }: import (fetchFromGitHub { owner = "NixOS"; repo = "nixpkgs"; inherit rev sha256; }) {}; in

let inherit (fetchNixpkgs {
	rev = "a39ed32a651fdee6842ec930761e31d1f242cb94"; # 24.11 2025/05/13
	sha256 = "k9ut1LSfHCr0AW82ttEQzXVCqmyWVA5+SHJkS5ID/Jo=";
}) nodejs_22 pnpm_10; in

mkShellNoCC { packages = [ cacert git nodejs_22 pnpm_10 ]; }
