export default function CopyrightGithub() {
  return (
    <div className="flex flex-col place-items-center">
      <div className=" mb-5 py-4 shadow-xl w-2/5 bg-cyan-500/70 rounded-md">
        <h4 className="text-white text-3xl">The Team Github</h4>
        <a
          className="text-[17px] text-white hover:text-black"
          href="https://github.com/sting-arrays"
          target="blank"
        >
          Sting Arrays
        </a>
      </div>

      <ul
        id="authors-list"
        className="py-4 shadow-xl w-2/5 bg-cyan-500/70 rounded-md"
      >
        <h3 className="text-white text-3xl">Contributors</h3>
        <li className="text-[17px]  text-white hover:text-black">
          <a href="https://github.com/tomalcock" target="blank">
            Tom Lacy-Alcock
          </a>
        </li>
        <li className="text-[17px]  text-white hover:text-black">
          <a href="https://github.com/muxappo" target="blank">
            Max Field
          </a>
        </li>
        <li className="text-[17px]  text-white hover:text-black">
          <a href="https://github.com/Isaac-Madden" target="blank">
            Isaac Madden
          </a>
        </li>
        <li className="text-[17px]  text-white hover:text-black">
          <a href="https://github.com/JordanEckford" target="blank">
            Jordan Eckford
          </a>
        </li>
        <li className="text-[17px]  text-white hover:text-black">
          <a href="https://github.com/LukeRiches" target="blank">
            Luke Riches
          </a>
        </li>
      </ul>

      <p className="mt-4 text-[20px] text-white">© 2023 Sting Arrays</p>
    </div>
  );
}
