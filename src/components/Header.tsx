import { CenteredHeaderContainer, HeaderContainer } from "@/styles/components/header";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import logoImg from "../assets/logo.svg"
import bag from "../assets/bag.svg"
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";

interface HeaderProps {
  open: () => void
}

export default function Header({ open } : HeaderProps) {
  const { totalQuantity } = useContext(AppContext)
   
  const router = useRouter()
  const isSuccessPageVisible = router.pathname === '/success'

  return (
    <>
      {isSuccessPageVisible ? (
        <CenteredHeaderContainer>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>
        </CenteredHeaderContainer>
      ) : (
        <HeaderContainer>
          <Link href="/">
            <Image src={logoImg} alt="" />
          </Link>
  
          <button onClick={open}>
            {totalQuantity > 0 ? <span>{totalQuantity}</span> : ''}         
            <Image src={bag} alt="" />
          </button>
        </HeaderContainer>
      )}
    </>
  )
}  