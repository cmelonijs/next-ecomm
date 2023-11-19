import React from 'react'

const ContactLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {
  return (
    <div>
        <div>ContactLayout</div>
        {children}
    </div>
  )
}

export default ContactLayout