from openai import OpenAI
import dotenv
from dotenv import load_dotenv, dotenv_values
import os

load_dotenv() 



OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)
assistant = client.beta.assistants.create(
  name="Course Planner",
  instructions="You are an Course Planner for the Georgia Tech Online Masters of Computer Science Program. Use you knowledge base to answer questions the course selection and advise students on courses to take depending on their interests, goals, and abilities.",
  model="gpt-3.5-turbo",
  tools=[{"type": "file_search"}],
)

files=["Computer Networks _ OMSCentral.html","Introduction to Information Security _ OMSCentral.html","Machine Learning _ OMSCentral.html","Machine Learning for Trading _ OMSCentral.html","Introduction to Graduate Algorithms _ OMSCentral.html","Graduate Introduction to Operating Systems _ OMSCentral.html","Knowledge-Based AI _ OMSCentral.html","Artificial Intelligence Techniques for Robotics _ OMSCentral.html","Data and Visual Analytics _ OMSCentral.html"]

for i in files:
    client.files.create(
  file=open(i, "rb"),
  purpose="fine-tune",
    )