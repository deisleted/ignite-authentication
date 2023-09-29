import Styled from './Navbar.module.css'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContexts'
import { CanRender } from '../components/CanRender'
import { SignOut } from 'phosphor-react'

function Navbar() {
  const { user, signOut, broadcastAuth } = useAuth()

  function handleSignOut() {
    broadcastAuth.current.postMessage('signOut')
    signOut()
  }

  return (
    <>
      <nav className={Styled.nav}>
        <Link href="/dashboard">
          <a className={Styled.logo}>
            {' '}
            <svg
              className={Styled.svg}
              width="378"
              height="68"
              viewBox="0 0 378 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M255.659 32.7741C255.659 38.2403 255.682 43.683 255.635 49.1492C255.635 49.9739 255.588 50.8457 255.329 51.6232C254.739 53.4138 252.924 54.3092 250.755 53.9793C248.798 53.6966 247.572 52.2358 247.43 50.0681C247.407 49.8325 247.43 49.6205 247.43 49.3849C247.43 38.7351 247.43 28.0854 247.43 17.4357C247.43 14.4434 245.733 12.8412 242.857 13.0061C240.97 13.124 239.626 14.2313 239.296 16.2812C238.943 18.3781 238.778 20.5222 238.566 22.6427C237.811 29.7818 237.222 36.9209 236.255 44.0364C235.406 50.398 231.021 53.9793 224.584 54.0264C223.146 54.05 221.661 53.9793 220.246 53.7201C215.484 52.7777 212.631 49.7618 211.664 45.1203C211.051 42.1515 210.815 39.0886 210.485 36.0491C209.825 29.8289 209.236 23.6088 208.599 17.3886C208.293 14.3491 206.831 12.959 204.214 13.0297C201.998 13.0768 200.489 14.4905 200.277 16.7053C200.229 17.2472 200.253 17.7655 200.253 18.3074C200.253 28.4624 200.253 38.6173 200.253 48.7723C200.253 49.2199 200.277 49.6912 200.229 50.1388C200.041 52.8013 198.438 54.1914 195.75 54.05C193.392 53.9322 192.048 52.2829 192.048 49.7147C192.048 38.7587 191.883 27.8027 192.025 16.8466C192.119 9.87249 196.363 5.63145 203.035 5.18378C204.568 5.08954 206.171 5.20734 207.703 5.49008C212.607 6.45609 215.79 10.061 216.521 15.645C217.181 20.64 217.629 25.6586 218.148 30.6536C218.549 34.5648 218.926 38.476 219.35 42.3871C219.633 44.8375 221.236 46.1334 223.853 46.1334C226.471 46.1334 228.097 44.814 228.357 42.3636C229.088 35.5072 229.724 28.6273 230.455 21.7474C230.738 19.0614 230.974 16.3283 231.61 13.7365C232.931 8.27032 236.939 5.20734 242.597 5.16022C244.248 5.13666 245.969 5.27803 247.572 5.70213C252.193 6.90376 255.352 10.7207 255.494 15.5036C255.659 21.2526 255.541 27.0251 255.541 32.7977C255.588 32.7741 255.635 32.7741 255.659 32.7741Z"
                fill="#0050DC"
              />
              <path
                d="M300.549 29.2399C300.549 32.6327 300.667 36.0491 300.526 39.442C300.172 47.7356 294.089 53.7673 285.79 54.2856C282.819 54.4741 279.896 54.3799 277.067 53.4374C270.819 51.364 267.542 46.8402 266.693 40.4551C266.528 39.277 266.504 38.099 266.481 36.9209C266.457 30.9363 266.457 24.9282 266.481 18.9436C266.504 15.7393 268.744 14.0664 271.856 14.8204C273.648 15.2445 274.638 16.6346 274.638 18.7787C274.638 24.7633 274.638 30.7714 274.638 36.756C274.638 37.6042 274.685 38.4288 274.78 39.277C275.228 43.683 277.774 46.2041 282.183 46.5575C283.197 46.6517 284.258 46.6517 285.272 46.5104C289.845 45.9449 292.321 43.1647 292.368 38.3346C292.439 31.9495 292.392 25.5879 292.415 19.2028C292.415 18.5902 292.462 17.9776 292.628 17.3886C293.146 15.4094 294.749 14.4905 297.201 14.7026C299.088 14.8675 300.479 16.0927 300.526 18.0012C300.62 21.7474 300.549 25.4937 300.549 29.2399Z"
                fill="#0050DC"
              />
              <path
                d="M343.365 15.0089C343.978 15.056 344.45 15.1031 344.945 15.1031C348.529 15.1267 352.136 15.0795 355.72 15.1267C358.148 15.1738 359.515 16.611 359.445 18.9436C359.374 21.017 357.959 22.36 355.672 22.3836C352.041 22.4307 348.411 22.4307 344.78 22.3836C343.695 22.36 343.342 22.6427 343.342 23.7737C343.389 28.8394 343.342 33.9286 343.365 38.9943C343.365 44.3192 346.972 47.3586 352.23 46.4868C353.173 46.3454 354.093 46.1098 355.036 45.9213C357.158 45.5444 358.808 46.2983 359.539 47.9947C360.435 50.0681 359.775 52.118 357.558 52.9897C355.719 53.7201 353.668 54.1442 351.688 54.3092C348.151 54.5684 344.756 53.8851 341.738 51.9295C337.919 49.432 336.08 45.7328 335.514 41.3269C335.373 40.1488 335.325 38.9707 335.302 37.7927C335.278 33.1747 335.302 28.5566 335.302 23.9386C335.302 22.4071 335.302 22.4071 333.699 22.4071C332.473 22.4071 331.247 22.4307 330.021 22.3836C327.686 22.3129 326.295 20.9699 326.272 18.8022C326.248 16.5403 327.592 15.1974 330.021 15.1267C331.364 15.0795 332.685 15.0795 334.029 15.1267C334.948 15.1502 335.325 14.8675 335.278 13.9015C335.208 12.2993 335.208 10.6971 335.278 9.09497C335.396 6.03199 338.084 4.28845 340.913 5.39583C342.752 6.12624 343.271 7.68129 343.318 9.44839C343.412 11.2626 343.365 13.1004 343.365 15.0089Z"
                fill="#0050DC"
              />
              <path
                d="M311.442 26.9545C311.442 19.7683 311.442 12.6056 311.442 5.41939C311.442 5.04241 311.442 4.66543 311.442 4.26489C311.513 1.48465 312.88 0.0238464 315.427 0.000285066C318.114 -0.0232763 319.6 1.41397 319.741 4.21777C319.765 4.47694 319.741 4.75968 319.741 5.01885C319.741 19.6504 319.741 34.2585 319.741 48.8901C319.741 49.4555 319.717 50.0446 319.623 50.5865C319.175 53.0133 317.761 54.0971 315.261 54.0029C313.116 53.9086 311.772 52.6128 311.489 50.3038C311.442 49.8561 311.442 49.3849 311.442 48.9372C311.442 41.6332 311.442 34.282 311.442 26.9545Z"
                fill="#0050DC"
              />
              <path
                d="M1.56967 56.4768C1.9469 56.4297 2.13552 56.4061 2.30056 56.4061C4.35175 56.3119 4.35175 56.3354 5.03549 58.2439C6.1436 61.4011 8.5013 63.1918 11.637 64.04C15.4094 65.0296 19.2053 65.0532 22.954 63.9458C27.2686 62.6499 30.0271 59.7283 30.5694 55.2516C31.0173 51.6467 30.8759 47.9476 30.9937 44.2956C30.8994 44.272 30.7815 44.2485 30.6872 44.2014C30.5458 44.3898 30.3807 44.5548 30.2864 44.7433C27.2922 51.5525 20.9264 53.9558 14.1834 53.1782C6.6623 52.3065 1.68755 47.123 0.485127 39.1828C-0.292913 34.1171 -0.31649 28.9572 1.78186 24.08C4.3046 18.1661 8.87854 15.0795 15.2679 14.7026C21.2565 14.3491 26.1369 16.3519 29.4612 21.5589C29.9564 22.3129 30.31 23.1611 30.9937 23.9386C31.0173 23.5616 31.088 23.1611 31.088 22.7841C31.1116 20.7107 31.1352 18.6609 31.088 16.5875C31.0645 15.5508 31.6775 15.5508 32.4084 15.5508C33.1864 15.5272 33.5872 15.6921 33.5872 16.611C33.5636 28.9807 33.6108 41.3504 33.5165 53.7201C33.4693 59.6105 30.0035 64.2521 24.3922 65.9956C18.7101 67.7627 13.0045 67.7156 7.55822 65.0296C4.11598 63.3332 2.22982 60.388 1.56967 56.4768ZM16.824 17.1058C9.96307 17.1058 5.31841 20.7107 3.6916 27.4021C2.67779 31.5489 2.67779 35.7428 3.55014 39.8896C4.89402 46.369 8.59561 49.9268 14.8907 50.7514C21.6808 51.6467 28.0466 48.5366 30.2157 40.9028C31.1824 37.5571 31.1824 34.1171 30.923 30.6771C30.2629 22.4071 24.793 17.1058 16.824 17.1058Z"
                fill="#0050DC"
              />
              <path
                d="M109.599 45.403C109.599 52.2829 109.599 59.1864 109.599 66.0427C106.888 66.4904 106.864 66.4668 106.864 63.9929C106.864 48.3717 106.864 32.7741 106.864 17.1529C106.864 15.645 107.572 15.1267 108.986 15.645C109.246 15.7393 109.434 16.2812 109.458 16.6346C109.529 18.7787 109.529 20.8992 109.576 23.0433C109.576 23.326 109.623 23.6088 109.67 24.1507C109.929 23.7737 110.071 23.6323 110.142 23.4674C113.16 16.988 118.417 14.3256 125.349 14.7261C131.927 15.1031 136.619 18.4017 138.788 24.5748C141.381 31.9023 141.405 39.3713 137.892 46.4868C135.487 51.3405 131.267 53.7908 125.868 54.2856C120.516 54.7568 115.847 53.4138 112.334 49.1492C111.391 47.9947 110.684 46.6282 109.859 45.3559C109.788 45.3794 109.694 45.403 109.599 45.403ZM137.68 34.5177C137.562 32.9155 137.515 31.3133 137.302 29.7347C136.854 26.4125 135.793 23.326 133.365 20.8992C129.569 17.0823 124.877 16.4461 119.879 17.6006C114.763 18.7787 111.792 22.3129 110.401 27.1901C109.151 31.596 109.081 36.1198 110.095 40.5494C110.542 42.4814 111.273 44.4605 112.334 46.1334C115.022 50.4451 119.219 52.0237 124.194 51.9059C129.498 51.7881 133.412 49.5027 135.723 44.6726C137.302 41.4682 137.656 38.0283 137.68 34.5177Z"
                fill="#0050DC"
              />
              <path
                d="M377.08 34.3998C377.08 39.4655 377.104 44.5548 377.08 49.6205C377.057 52.6599 375.312 54.2621 372.365 54.0029C370.597 53.8615 369.276 52.707 368.97 50.9635C368.852 50.2566 368.781 49.5262 368.781 48.7958C368.781 39.1828 368.781 29.5462 368.781 19.9332C368.781 19.4384 368.805 18.9436 368.876 18.4488C369.229 15.7864 370.62 14.5848 373.261 14.679C375.595 14.7732 376.986 16.234 377.08 18.8022C377.127 20.4751 377.104 22.1715 377.104 23.8444C377.08 27.3786 377.08 30.8892 377.08 34.3998Z"
                fill="#0050DC"
              />
              <path
                d="M146.804 34.5648C146.804 30.7714 147.275 27.0958 148.949 23.6323C151.637 18.119 156.14 15.2916 162.176 14.7497C164.77 14.5141 167.363 14.679 169.886 15.5036C174.53 17.0116 177.855 20.051 179.552 24.5983C181.957 31.007 182.028 37.5806 179.717 43.9893C177.43 50.3509 172.597 53.673 165.878 54.2856C162.506 54.5919 159.229 54.2149 156.164 52.7306C150.765 50.1153 148.195 45.4972 147.252 39.7954C146.945 38.0754 146.945 36.3083 146.804 34.5648ZM149.515 34.1407C149.845 36.7324 149.916 39.0414 150.458 41.2326C152.132 48.2539 156.848 51.8588 164.062 51.8824C171.088 51.8824 175.851 48.301 177.572 41.5154C178.727 36.9445 178.656 32.2793 177.619 27.6849C177.124 25.4701 176.181 23.4203 174.695 21.6767C171.253 17.6477 166.703 16.6582 161.728 17.2707C155.999 17.9776 152.321 21.2997 150.765 26.766C150.058 29.2163 149.892 31.8317 149.515 34.1407Z"
                fill="#0050DC"
              />
              <path
                d="M93.1898 46.0863C93.1191 46.157 93.0248 46.2276 92.9777 46.3219C89.9834 52.33 85.6452 54.7804 78.9022 54.2856C73.6681 53.8851 69.9194 51.0342 68.434 46.1098C67.986 44.6726 67.6796 43.1175 67.656 41.6096C67.5617 33.2925 67.6088 24.9518 67.5617 16.6346C67.5617 15.5037 68.1747 15.5508 68.9527 15.5508C69.7543 15.5272 70.3437 15.5743 70.3437 16.6817C70.2966 24.3863 70.3202 32.1144 70.3202 39.819C70.3202 42.34 70.6974 44.7668 71.8998 47.0052C73.9039 50.7043 78.4071 52.5656 83.1932 51.7174C89.0875 50.6807 93.0012 46.2512 93.2606 39.6776C93.5435 32.4443 93.4256 25.1638 93.4728 17.9305C93.4728 17.4357 93.4964 16.9409 93.4728 16.4461C93.4256 15.3858 94.2037 15.5743 94.8167 15.5743C95.4297 15.5743 96.2313 15.3387 96.1605 16.4225C96.137 16.6582 96.1605 16.8702 96.1605 17.1058C96.1605 28.7451 96.1605 40.408 96.1605 52.0473C96.1605 53.3667 95.0053 54.0736 93.85 53.4374C93.6378 53.3196 93.5199 52.8719 93.5199 52.5656C93.4728 50.8928 93.4728 49.1964 93.4728 47.5235C93.4728 47.0523 93.4728 46.5575 93.4728 46.0863C93.3785 46.1098 93.2842 46.0863 93.1898 46.0863Z"
                fill="#0050DC"
              />
              <path
                d="M47.4033 23.3967C47.5684 23.0668 47.7098 22.7134 47.8749 22.3836C50.209 17.4121 54.0756 14.7968 59.5926 14.7026C61.078 14.679 61.078 14.7026 61.078 16.2341C61.078 16.6346 61.078 17.0587 61.078 17.4357C59.404 17.6006 57.8715 17.6242 56.4097 17.954C51.3171 19.1321 48.6293 22.6427 47.5919 27.5435C47.2619 29.0514 47.144 30.6536 47.1204 32.2086C47.0733 38.9001 47.0733 45.5679 47.1204 52.2593C47.1204 53.1782 46.9789 53.673 45.8944 53.6023C44.9513 53.5552 44.3383 53.5552 44.3619 52.3065C44.4091 40.5022 44.4091 28.7216 44.3619 16.9173C44.3619 15.7864 44.8334 15.6215 45.8001 15.5979C46.7903 15.5743 47.144 15.8806 47.1204 16.8938C47.0497 19.0614 47.0968 21.2291 47.0968 23.3967C47.1676 23.3496 47.2854 23.3731 47.4033 23.3967Z"
                fill="#0050DC"
              />
              <path
                d="M372.907 0.0238495C375.925 0.0238495 377.953 1.95588 378 4.83036C378.023 7.75197 375.925 9.82537 372.931 9.80181C370.007 9.80181 367.862 7.70485 367.885 4.87749C367.885 2.003 369.936 0.0238495 372.907 0.0238495Z"
                fill="#0050DC"
              />
            </svg>
          </a>
        </Link>
        <ul className={Styled.ul}>
          <CanRender roles={['Administrador']}>
            <li className={Styled.li}>
              <Link href="/meu-perfil">
                <a href="" className={Styled.a}>
                  Entrada de Veiculos
                </a>
              </Link>
            </li>
          </CanRender>
          <CanRender roles={['Administrador']}>
            <li className={Styled.li}>
              <Link href="/listar-user">
                <a href="" className={Styled.a}>
                  Motorista
                </a>
              </Link>
            </li>
          </CanRender>
          <CanRender roles={['Administrador']}>
            <li className={Styled.li}>
              <Link href="/new-user">
                <a href="" className={Styled.a}>
                  Usuários
                </a>
              </Link>
            </li>
          </CanRender>
          <li className={Styled.li}>
            <Link href="/meu-perfil">
              <a href="" className={Styled.a}>
                Meu perfil
              </a>
            </Link>
          </li>
        </ul>
        <a className={Styled.saudacao}>Olá, {user?.name ?? ''}</a>

        <a className={Styled.button} onClick={handleSignOut}>
          <SignOut size={24} /> Sair
        </a>
      </nav>
    </>
  )
}

export default Navbar