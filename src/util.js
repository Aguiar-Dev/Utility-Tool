exports.log = (title, obj, status) => {
  const seperator = '\n==============================\n';
  const output = seperator + title + seperator;
  console.log(output, obj, status);
};
