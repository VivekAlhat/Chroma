const getBlobByName = (name: string, uploads: File[] | null): File => {
  return uploads?.filter((u) => u.name === name).at(0)!;
};

export { getBlobByName };
