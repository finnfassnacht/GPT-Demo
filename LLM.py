from transformers import pipeline # First line
import sys
prompt = sys.argv[1]
generator = pipeline('text-generation', model='EleutherAI/gpt-neo-125M') # Second line
res = generator(prompt, max_length=20, do_sample=True, temperature=0.9,  pad_token_id=50256) # Fourth line
print(res[0]["generated_text"])
