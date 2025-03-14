import { Link } from "../components/link";

export function Index() {
  return (
    <>
      <h1 className="text-2xl font-bold">About Me</h1>
      <p className="mt-4">
        Hello, my name is Adam. I am a software and controls engineer based in{" "}
        <Link label={"Cincinnati, OH"} url={"https://www.google.com/maps/place/Cincinnati,+OH"} />, 
        currently working at{" "}
        <Link label={"Milacron"} url={"https://www.milacron.com"}/ >{" "}
        as a Controls System Architecture Engineer.  
        I&apos;m actively learning web development, as well as deepening my understanding of data structures and algorithms.
      </p>
      <p className="mt-4">
        My fascination with computer software began in childhood, driven by a passion for reverse engineering. I loved taking things apart to understand how they worked from the inside out, 
        which ultimately shaped my career path.
      </p>
      <p className="mt-4">
        This curiosity led me to pursue a degree in Mechanical Engineering, where I developed a strong foundation in problem-solving and system design. 
        While working as a test engineer, I became increasingly fascinated by software and its role in automation and system optimization. 
        This curiosity drove me to deepen my understanding of programming, leading me to explore software engineering more broadly. 
        Now, I am actively expanding my skills in software development, focusing on data structures, algorithms, and modern application development to build scalable and efficient software solutions.
      </p>
      <p className="mt-4">
        I&apos;m always eager to collaborate on interesting projects or explore new challenges—feel free to reach out if there&apos;s something I can contribute to!
      </p>
    </>
  );
}
