/* eslint-disable react/no-danger */
import type { FC } from "react"

export interface GoogleAnalyticsBodyProps {
  active?: boolean
}

const GoogleAnalyticsBody: FC<GoogleAnalyticsBodyProps> = ({ active }) =>
  active ? (
    <>
      {/* <!-- Google Tag Manager (noscript) --> */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5GTSSXK" height="0" width="0"
            style="display:none;visibility:hidden"></iframe>`,
        }}
      />
      {/* <!-- End Google Tag Manager (noscript) --> */}
    </>
  ) : (
    <noscript />
  )

GoogleAnalyticsBody.defaultProps = {
  active: false,
}

export default GoogleAnalyticsBody
