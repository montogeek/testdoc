workflow "New workflow" {
  on = "push"
  resolves = ["First interaction"]
}

action "GitHub Action for Docker" {
  uses = "actions/docker/cli@86ff551d26008267bb89ac11198ba7f1d807b699"
  secrets = ["GITHUB_TOKEN"]
}

action "First interaction" {
  uses = "actions/first-interaction@b01f95e46968766d9daee3f385dd7867626ebe67"
  needs = ["GitHub Action for Docker"]
}
