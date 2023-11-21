function newDraw() {
    function pickTeam(group) {
        let team = group.splice(Math.floor(Math.random() * group.length), 1);
        return team.toString();
    }

    function printTeams(group, groupLetter) {
        let number = 1;
        for (let team of group) {
            document.getElementById(`${groupLetter}${number}`).innerHTML = `${team}`;
            number++;
        }
        console.log();
    }

    let remainingTeams = ['Finland', 'Ukraine', 'Iceland'];
    let pathA = ['Poland', 'Wales', pickTeam(remainingTeams), 'Estonia'];
    let pathB = ['Israel', 'Bosnia and Herzegovina', pickTeam(remainingTeams), pickTeam(remainingTeams)];
    let pathC = ['Georgia', 'Greece', 'Kazakhstan', 'Luxembourg'];

    const pot1 = ['Portugal', 'France', 'Spain', 'Belgium', 'England']
    const pot2 = ['Hungary', 'Turkey', 'Romania', 'Denmark', 'Albania', 'Austria'];
    const pot3 = ['Netherlands', 'Scotland', 'Croatia', 'Slovenia', 'Slovakia', 'Czech Republic'];
    let pot4 = ['Italy', 'Serbia', 'Switzerland', pickTeam(pathA), pickTeam(pathB), pickTeam(pathC)];

    let groupA = ['Germany', pickTeam(pot2), pickTeam(pot3), pickTeam(pot4)];
    let groupB = [pickTeam(pot1), pickTeam(pot2), pickTeam(pot3), pickTeam(pot4)];
    let groupC = [pickTeam(pot1), pickTeam(pot2), pickTeam(pot3), pickTeam(pot4)];
    let groupD = [pickTeam(pot1), pickTeam(pot2), pickTeam(pot3), pickTeam(pot4)];
    let groupE = [pickTeam(pot1), pickTeam(pot2), pickTeam(pot3), pickTeam(pot4)];
    let groupF = [pickTeam(pot1), pickTeam(pot2), pickTeam(pot3), pickTeam(pot4)];

    printTeams(groupA, 'a');
    printTeams(groupB, 'b');
    printTeams(groupC, 'c');
    printTeams(groupD, 'd');
    printTeams(groupE, 'e');
    printTeams(groupF, 'f');
}

document.getElementById('generate').addEventListener('click', function () {
    newDraw()
});
