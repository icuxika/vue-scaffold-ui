import type { UserConfig } from "@commitlint/types";

const defaultTypes = [
    "build", // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
    "ci", // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
    "docs", // 文档更新
    "feat", // 新增功能
    "fix", // bug 修复
    "style", // 不影响程序逻辑的代码修改(修改空白字符，补全缺失的分号等)
    "refactor", // 重构代码(既没有新增功能，也没有修复 bug)
    "perf", // 性能优化
    "test", // 新增测试用例或是更新现有测试
    "revert", // 回滚某个更早之前的提交
    "chore", // 不属于以上类型的其他类型(日常事务)
];

const extraTypes = ["optimize"];

const Configuration: UserConfig = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "header-max-length": [0, "always", 72],
        "scope-case": [0],
        "scope-empty": [0],
        "type-enum": [2, "always", [...defaultTypes, ...extraTypes]],
        "type-case": [0],
        "type-empty": [0],
    },
};

export default Configuration;
