export async function createYouGileTask(data: any) {
  const apiKey = process.env.YOUGILE_API_KEY;
  const boardId = process.env.YOUGILE_BOARD_ID;
  const columnId = process.env.YOUGILE_COLUMN_ID;

  if (!apiKey || !columnId) {
    console.warn("YouGile credentials missing. Skipping task creation.");
    return null;
  }

  const description = `
Имя: ${data.name}
Телефон: ${data.phone}
Направление: ${data.direction}
Комментарий: ${data.comment || "—"}

---
Страница: ${data.page || "—"}
UTM Source: ${data.utm_source || "—"}
UTM Medium: ${data.utm_medium || "—"}
UTM Campaign: ${data.utm_campaign || "—"}
Referrer: ${data.referrer || "—"}
Дата: ${new Date().toLocaleString("ru-RU")}
  `.trim();

  try {
    const response = await fetch("https://api.yougile.com/api-v2/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        title: `Новая заявка: ${data.name} (${data.direction})`,
        columnId: columnId,
        description: description,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`YouGile API error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();
  } catch (error) {
    console.error("YouGile integration failed:", error);
    throw error;
  }
}
