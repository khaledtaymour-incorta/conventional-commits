const matchAnyFeatureTypeRegex = /(feat|fix|chore)/;
const matchJiraTicketRegex = /(?:\(([A-Z]{2,}-\d+)\))\!?:\s/;
const subjectRegex = /(.+)$/;
const commitRegex = /^(feat|fix|chore)(?:\(([A-Z]{2,}-\d+)\))\!?:\s(.+)$/;

function checkMatchingRegex(string, regex) {
  return regex.test(string);
}

module.exports = {
  parserPreset: {
    parserOpts: {
      // headerPattern: new RegExp(
      //   "^" +
      //     matchAnyFeatureType.source +
      //     matchJiraTicket.source +
      //     subject.source +
      //     "$"
      // ),
      headerPattern: /^(feat|fix|chore)(?:\(([A-Z]{2,}-\d+)\))\!?:\s(.+)$/,
      headerCorrespondence: ["type", "ticket", "subject"],
    },
  },
  plugins: [
    {
      rules: {
        "header-match-team-pattern": (parsed) => {
          const { type, ticket, subject, header } = parsed;

          console.log(parsed);
          if (
            !header ||
            !checkMatchingRegex(header, commitRegex) ||
            (type === null && ticket === null && subject === null)
          ) {
            return [
              false,
              "header must be in format \n • 'feat(INC-123): description' or\n • 'fix(INC-123): description' or\n • 'chore(INC-123): description' or\n • 'feat(IC-123): description' or\n • 'fix(IC-123): description' or\n • 'chore(IC-123): description'",
            ];
          }

          return [true, ""];
        },
        "explained-type-enum": (parsed, _when, typesObject) => {
          const { type } = parsed;
          if (type && !Object.keys(typesObject).includes(type)) {
            return [
              false,
              `type must be one of:
${Object.keys(typesObject)
  .map((t) => `${t} - ${typesObject[t]}`)
  .join("\n • ")}`,
            ];
          }
          return [true, ""];
        },
      },
    },
  ],
  rules: {
    "header-match-team-pattern": [2, "always"],
    "explained-type-enum": [
      2,
      "always",
      {
        feat: "New feature",
        fix: "Bug fix",
        chore: "Add chore",
      },
    ],
  },
};
