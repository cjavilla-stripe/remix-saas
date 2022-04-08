import {redirect} from '@remix-run/node'
import {requireUser} from '~/session.server'
import {createBillingSession} from '~/models/subscription.server';

export const action = async ({request}) => {
  const user = await requireUser(request)

  // create a customer portal session
  const url = await createBillingSession(user)

  // redirect to the customer portal
  return redirect(url);
}
