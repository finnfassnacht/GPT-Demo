from transformers import pipeline # import transformers
import sys 
prompt = sys.argv[2] # take terminal args
maxlen = sys.argv[1]
generator = pipeline('text-generation', model='EleutherAI/gpt-neo-125M') # specify wich LLM to use
res = generator(prompt, max_length=int(maxlen), do_sample=True, temperature=0.9,  pad_token_id=50256) # generate 
print(res[0]["generated_text"]) # print response
