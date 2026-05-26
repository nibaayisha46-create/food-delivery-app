const express =
    require("express");

const router =
    express.Router();

const OpenAI =
    require("openai");

const openai =
    new OpenAI({

        apiKey:
            process.env
                .OPENAI_API_KEY

    });

router.post(

    "/chat",

    async (req, res) => {

        const {
            message
        } = req.body;

        try {

            const completion =

                await openai
                    .chat.completions
                    .create({

                        model:
                            "gpt-3.5-turbo",

                        messages: [

                            {

                                role: "system",

                                content:
                                    "You are a food delivery AI assistant. Please provide your responses in plain text format without using markdown symbols like asterisks or hash tags."

                            },

                            {

                                role: "user",

                                content:
                                    message

                            }

                        ]

                    });

            res.json({

                reply:

                    completion
                        .choices[0]
                        .message
                        .content

            });

        }

        catch (error) {

            console.log("OpenAI API Quota Exceeded or Error. Using Fallback AI.", error.message);

            const userText = message.toLowerCase();
            let fallbackReply = "I'm currently experiencing high traffic! But I can still help you find some great food.";

            if (userText.includes("spicy") || userText.includes("hot")) {
                fallbackReply = "If you love spicy food, I highly recommend our Spicy Chicken Wings, Jalapeno Poppers, or the Arabian Mandhi! 🔥";
            } else if (userText.includes("biriyani") || userText.includes("briyano") || userText.includes("hotel")) {
                fallbackReply = "Ah, a Biriyani lover! We have some amazing local options. The Arabian Palace has the best Mandhi, but our local partners have fantastic Malabar Biriyani!";
            } else if (userText.includes("pizza") || userText.includes("burger")) {
                fallbackReply = "Craving fast food? You can check out Pizza Hut or Burger King from our top restaurants list on the Foods page!";
            } else if (userText.includes("sweet") || userText.includes("dessert") || userText.includes("cake")) {
                fallbackReply = "You can't go wrong with our Chocolate Cake from the Chinese categories. It's perfectly sweet!";
            } else if (userText.includes("hello") || userText.includes("hi") || userText.includes("hey")) {
                fallbackReply = "Hello there! I'm your EATOK AI assistant. What kind of food are you craving today?";
            } else if (userText.includes("price") || userText.includes("cost") || userText.includes("cheap")) {
                fallbackReply = "We have great options for all budgets! Use the search bar on our Foods page to find exactly what fits your wallet.";
            }

            res.json({
                reply: fallbackReply
            });

        }

    }

);

module.exports =
    router;