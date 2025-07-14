export function withResource(resource, task) {
  try {
    task(resource);
  } finally {
    resource.close();
  }
}
