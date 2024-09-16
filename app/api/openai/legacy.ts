import OpenAI from "openai";

const openai = new OpenAI();

const my_assistant = openai.beta.assistants.retrieve("asst_abc123")

async function main() {
  const threadMessages = await openai.beta.threads.messages.create(
    "thread_abc123",
    { role: 'assistant', content: "How does AI work? Explain it in simple terms." }
  );

  console.log(threadMessages);
}

main();