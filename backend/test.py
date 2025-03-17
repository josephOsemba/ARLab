from gpt4all import GPT4All
import backend.config.config as config

model = GPT4All(config.MODEL_PATH)
with model.chat_session():
    response = model.generate("Explain Newton's laws of motion.")
    print(response)
