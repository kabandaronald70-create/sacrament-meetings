"use client";

import { useActionState } from "react";
import { createMeeting, type State } from "@/lib/actions";
import Link from "next/link";

const initialState: State = { message: null, errors: {} };

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(
    createMeeting,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="block w-full rounded-md border border-slate-300 px-3 py-2"
          aria-describedby="date-error"
          required
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
          {state.errors?.date?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="meetingType"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          className="block w-full rounded-md border border-slate-300 px-3 py-2"
          aria-describedby="meetingType-error"
          required
        >
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
          <option value="special">Special</option>
        </select>
        <div id="meetingType-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingType?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="presiding"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Presiding
          </label>
          <input
            type="text"
            id="presiding"
            name="presiding"
            className="block w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="presiding-error"
            required
          />
          <div id="presiding-error" aria-live="polite" aria-atomic="true">
            {state.errors?.presiding?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="conducting"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Conducting
          </label>
          <input
            type="text"
            id="conducting"
            name="conducting"
            className="block w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="conducting-error"
            required
          />
          <div id="conducting-error" aria-live="polite" aria-atomic="true">
            {state.errors?.conducting?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="openingHymn"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Opening Hymn
          </label>
          <input
            type="text"
            id="openingHymn"
            name="openingHymn"
            className="block w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="openingHymn-error"
            required
          />
          <div id="openingHymn-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingHymn?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="openingPrayer"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Opening Prayer
          </label>
          <input
            type="text"
            id="openingPrayer"
            name="openingPrayer"
            className="block w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="openingPrayer-error"
            required
          />
          <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.openingPrayer?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="sacramentHymn"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Sacrament Hymn
        </label>
        <input
          type="text"
          id="sacramentHymn"
          name="sacramentHymn"
          className="block w-full rounded-md border border-slate-300 px-3 py-2"
          aria-describedby="sacramentHymn-error"
          required
        />
        <div id="sacramentHymn-error" aria-live="polite" aria-atomic="true">
          {state.errors?.sacramentHymn?.map((error) => (
            <p key={error} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="closingHymn"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Closing Hymn
          </label>
          <input
            type="text"
            id="closingHymn"
            name="closingHymn"
            className="block w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="closingHymn-error"
            required
          />
          <div id="closingHymn-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingHymn?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="closingPrayer"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Closing Prayer
          </label>
          <input
            type="text"
            id="closingPrayer"
            name="closingPrayer"
            className="block w-full rounded-md border border-slate-300 px-3 py-2"
            aria-describedby="closingPrayer-error"
            required
          />
          <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.closingPrayer?.map((error) => (
              <p key={error} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        </div>
      </div>

      {state.message ? (
        <p className="text-sm text-red-600">{state.message}</p>
      ) : null}

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Meeting"}
        </button>
        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
