function filterNullValues(
  obj: Record<string, number | string | boolean | null>
): Record<string, number | string | boolean> {
  const filteredObj: Record<string, number | string | boolean> = {};

  for (const key in obj) {
    const currentObject = obj[key];
    if (currentObject !== null) {
      filteredObj[key] = currentObject;
    }
  }

  return filteredObj;
}
