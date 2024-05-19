import { useState } from "react"
import OpenAI from 'openai';
import './Chat.css';
const Chat = () => {
    const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    organization: process.env.REACT_APP_ORGANIZATION,
    project: "",
    dangerouslyAllowBrowser: true
  });


  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        /*
        const assistant = await openai.beta.assistants.create({
            name: "Course Planner",
            instructions: "You are an Course Planner for the Georgia Tech Online Masters of Computer Science Program. Use you knowledge base to answer questions the course selection and advise students on courses to take depending on their interests, goals, and abilities.",
            tools: [{ type: "file_search" }],
            model: "gpt-3.5-turbo"
        });

         */
      const thread = await openai.beta.threads.create();
      const message = await openai.beta.threads.messages.create(
        thread.id,
  {
          role: "user",
          content: prompt
        }
      );

      let run = await openai.beta.threads.runs.createAndPoll(
      thread.id,
      {
          assistant_id: process.env.REACT_APP_ASSISTANT_ID,
          instructions: "Please address the user as Jane Doe. The user has a premium account."
        }
      );


      if (run.status === 'completed') {
        const messages = await openai.beta.threads.messages.list(
          run.thread_id
        );
        for (const message of messages.data.reverse()) {
          console.log(`${message.role} > ${message.content[0].text.value}`);
          setApiResponse(message.content[0].text.value);
        }
      } else {
        console.log(run.status);
      }

    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };


  return (
    <>
      <div className="Chat-container">
      <div className="Chat-title" >
          <p className="Chat-intro">We've pooled official resources (Georgia Tech's <a href="https://omscs.gatech.edu/">OMSCS</a> website) and user-generated sources, including student reviews, and trained an AI assistant to help guide you in course exploration and selection. </p>
          <h2>Explore OMSCS:</h2>
      </div>
        <form onSubmit={handleSubmit}>
            <div className="Chat-form-container">
              <textarea className="Chat-textarea"
                type="text"
                value={prompt}
                placeholder="What would you like to learn?"
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
              <button className="Chat-generate"
                disabled={loading || prompt.length === 0}
                type="submit"
              >
                {loading ? "Generating..." : "Generate"}
              </button>
            </div>
        </form>
      {apiResponse && (
        <div className="Chat-response-container">
           {apiResponse}
        </div>
      )}
      </div>
    </>
  );
};


export default Chat;