export const config = {
    stripe: {
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      plans:{
        free: {
          priceId:'price_1P5q1vB0yKmJgkcZEIDIyIDC',
        quota:{
          TASKS: 5,
        }
        },
        pro: {
          priceId:'price_1P5q2ZB0yKmJgkcZ0NDh6Htm',
          quota:{
            TASKS: 100,
          }
        }
      }
    }
  }