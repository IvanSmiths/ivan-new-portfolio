export function extractPostMetadata(content: string) {
  const varRegex = /const\s+(\w+)\s*=\s*(['"`][\s\S]*?['"`]);/g;
  let match: RegExpExecArray | null;
  let contextVars = "";

  match = varRegex.exec(content);
  while (match !== null) {
    contextVars += `var ${match[1]} = ${match[2]};\n`;
    match = varRegex.exec(content);
  }

  const metadataMatch = content.match(
    /export\s+const\s+data\s*[:\s\w<>,]*=\s*({[\s\S]*?});/m
  );

  if (!metadataMatch || !metadataMatch[1]) {
    return {};
  }

  try {
    const metadataStr = metadataMatch[1];
    return new Function(`${contextVars}return ${metadataStr}`)();
  } catch (error) {
    console.error("Error parsing postMetadata:", error);
    return {};
  }
}
