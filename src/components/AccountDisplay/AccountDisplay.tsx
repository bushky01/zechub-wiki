import { Spinner, Tooltip } from 'flowbite-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import './AccountDisplay.css';

type SVGProps = {
  width: number;
  height: number;
};

const SignInIcon = (props: SVGProps) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 595 594'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='298' cy='297' r='297' fill='#14773C' />
      <path
        d='M115.574 231.302C103.142 226.804 96.592 213.002 102.429 201.14C121.65 162.076 152.261 129.503 190.479 107.896C235.676 82.3441 288.527 73.8153 339.467 83.8533C390.407 93.8912 436.071 121.833 468.195 162.621C500.319 203.409 516.78 254.35 514.601 306.224C512.421 358.098 491.744 407.478 456.311 445.427C420.879 483.377 373.032 507.389 321.429 513.118C269.827 518.847 217.878 505.915 174.984 476.662C138.713 451.925 110.943 416.899 95.0663 376.36C90.2451 364.049 97.9295 350.846 110.696 347.407V347.407C123.462 343.968 136.445 351.625 141.647 363.78C154.289 393.318 175.145 418.819 201.961 437.107C235.405 459.916 275.911 470 316.146 465.533C356.381 461.065 393.688 442.343 421.316 412.753C448.943 383.163 465.065 344.661 466.765 304.214C468.464 263.767 455.629 224.048 430.581 192.245C405.534 160.441 369.929 138.655 330.21 130.828C290.491 123.001 249.283 129.651 214.042 149.575C185.787 165.549 162.865 189.209 147.79 217.583C141.586 229.258 128.007 235.8 115.574 231.302V231.302Z'
        fill='#fff'
      />
      <path
        d='M95 285.5C88.6487 285.5 83.5 290.649 83.5 297C83.5 303.351 88.6487 308.5 95 308.5L95 285.5ZM356.132 305.132C360.623 300.641 360.623 293.359 356.132 288.868L282.946 215.683C278.455 211.192 271.174 211.192 266.683 215.683C262.192 220.174 262.192 227.455 266.683 231.946L331.737 297L266.683 362.054C262.192 366.545 262.192 373.826 266.683 378.317C271.174 382.808 278.455 382.808 282.946 378.317L356.132 305.132ZM95 308.5L348 308.5L348 285.5L95 285.5L95 308.5Z'
        fill='white'
      />
    </svg>
  );
};
const SignOutIcon = (props: SVGProps) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox='0 0 594 594'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='297'
        cy='297'
        r='297'
        transform='rotate(90 297 297)'
        fill='red'
      />
      <path
        d='M356.353 112.887C360.415 100.305 373.979 93.2777 386.039 98.6971C425.75 116.543 459.371 145.998 482.298 183.44C509.412 227.717 519.78 280.238 511.526 331.497C503.272 382.756 476.941 429.368 437.299 462.896C397.656 496.424 347.321 514.653 295.403 514.285C243.485 513.917 193.413 494.976 154.25 460.889C115.087 426.803 89.4196 379.823 81.893 328.452C74.3664 277.081 85.4779 224.712 113.217 180.824C136.673 143.711 170.708 114.735 210.668 97.4541C222.803 92.2061 236.267 99.425 240.149 112.063V112.063C244.031 124.702 236.832 137.944 224.866 143.567C195.787 157.232 171.03 178.966 153.689 206.403C132.061 240.624 123.397 281.456 129.265 321.511C135.134 361.566 155.147 398.197 185.683 424.775C216.219 451.352 255.261 466.121 295.742 466.408C336.224 466.695 375.471 452.481 406.381 426.339C437.291 400.197 457.821 363.853 464.257 323.886C470.693 283.918 462.609 242.967 441.468 208.443C424.517 180.763 400.071 158.68 371.188 144.604C359.304 138.812 352.292 125.469 356.353 112.887V112.887Z'
        fill='#fff'
      />
      <line
        x1='303.567'
        y1='71.7705'
        x2='303.567'
        y2='261.771'
        stroke='white'
        stroke-width='31'
        stroke-linecap='round'
      />
    </svg>
  );
};

type AuthDisplayProps = {
  style?: React.CSSProperties;
};

export const AuthDisplay = ({ style }: AuthDisplayProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <Spinner />;

  return (
    <div className='account-display' style={style}>
      {status === 'authenticated' && session?.user?.name && (
        <Image
          width={25}
          height={25}
          src={session.user.image!}
          alt={session.user.name!}
          style={{ borderRadius: '50%', fontWeight: 700 }}
        />
      )}

      {status === 'authenticated' ? (
        <button onClick={() => signOut()}>
          <Tooltip content='Sign out' placement='left'>
            <SignOutIcon width={25} height={25} />
          </Tooltip>
        </button>
      ) : (
        <button onClick={() => signIn('github')} style={{ minWidth: '60px' }}>
          Sign in
        </button>
      )}
    </div>
  );
};
