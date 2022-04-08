import { redirect } from "@remix-run/node";
import {createCheckoutSession} from '~/models/subscription.server'
import { requireUser } from '~/session.server'

export const action = async ({request}) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const price = formData.get("price");

  // create a checkout session and redirect
  const url = await createCheckoutSession(user, price);

  return redirect(url)
}

export default function Pay() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-teal-600">Start your free trial today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <form method="POST">
              <input type="hidden" name="price" value="price_1K9bejCZ6qsJgndJU7RlM7Zj" />
              <button
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
              >
                Get started
              </button>
            </form>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <form action="/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
