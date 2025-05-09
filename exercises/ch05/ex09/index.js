export function jsonParse(data) {
  try {
    const result = JSON.parse(data);
    return { success: true, data: result };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
