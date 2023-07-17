/**
 * 왼쪽에 큰사람이 몇명인가
 * 줄을 설 수 있는 위치는 최소 왼쪽에 있는 사람 수 보다 커야한다.
 * BF로 세워놓고 조건검사?
 */

const main = () => {
  const input = require("fs")
    .readFileSync("dev/stdin")
    .toString()
    .trim()
    .split("\n");

  const N = +input[0];
  const recode = input[1].split(" ").map(Number);
  const visited = new Array(N).fill(false);

  backTracking(N, recode, visited, 0, []);
};

const check = (N, recode, ans) => {
  for (let i = 0; i < N; i++) {
    let cnt = 0;
    for (let j = 0; j < i; j++) {
      if (ans[i] < ans[j]) cnt += 1;
    }
    if (cnt !== recode[ans[i] - 1]) return false;
  }

  return true;
};

const backTracking = (N, recode, visited, cnt, ans) => {
  if (cnt === N) {
    if (check(N, recode, ans)) {
      console.log(ans.join(" "));
      process.exit(0);
    }
  }
  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      ans.push(i + 1); // 사람들의 번호
      backTracking(N, recode, visited, cnt + 1, ans);
      visited[i] = false;
      ans.pop();
    }
  }
};

main();
