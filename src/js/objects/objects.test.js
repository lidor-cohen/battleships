const Ship = require("./Ship");
const Gameboard = require("./Gameboard");

describe("Ship", () => {
  describe("hit", () => {
    it("should increment the number of hits and sink the ship", () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.hits).toBe(3);
      expect(ship.sunk).toBe(true);
    });

    it("should increment the number of hits and not sink the ship", () => {
      const ship = new Ship(5);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.hits).toBe(3);
      expect(ship.sunk).toBe(false);
    });
  });

  describe("isSunk", () => {
    it("should check if a sunken ship is sunk", () => {
      const ship = new Ship(3);
      ship.hit();
      ship.hit();
      ship.hit();

      expect(ship.isSunk()).toBe(true);
    });

    it("should check if a ship with no hits is sunk", () => {
      const ship = new Ship(5);

      expect(ship.isSunk()).toBe(false);
    });
  });

  describe("sink", () => {
    it("should set sunk to true", () => {
      const ship = new Ship(4);
      ship.sink();
      expect(ship.sunk).toBe(true);
    });
  });
});

describe("Gameboard", () => {
  describe("board", () => {
    it("should return an empty 10x10 array (grid)", () => {
      const gameboard = new Gameboard();
      expect(gameboard.board.length).toBe(10);

      for (let i = 0; i < 10; i++) {
        gameboard.board[i].forEach((item) => expect(item).toBe(null));
      }
    });
  });

  describe("receiveAttack", () => {
    it("should miss when receiving attack on empty cell", () => {
      const gameboard = new Gameboard();
      expect(gameboard.receiveAttack(3, 4)).toBe(false);
      expect(gameboard.misses[0]).toEqual([3, 4]);
    });

    it("should hit and sink a ship that has been attacked", () => {
      const gameboard = new Gameboard();

      gameboard.addShip(new Ship(1), 1, 2);

      expect(gameboard.receiveAttack(1, 2)).toBe(true);
      expect(gameboard.hits[0]).toEqual([1, 2]);

      expect(gameboard.board[1][2].isSunk()).toBe(true);
    });
  });

  describe("add a new ship to the gameboard", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(1);
    gameboard.addShip(ship, 1, 2);

    expect(gameboard.board[1][2]).toEqual(ship);
    expect(gameboard.ships).toContain(ship);
  });

  describe("allShipsSunk", () => {
    it("should return false meaning not all ships has sunken yet", () => {
      const gameboard = new Gameboard();

      gameboard.addShip(new Ship(1), 1, 2);
      gameboard.addShip(new Ship(1), 3, 5);

      gameboard.receiveAttack(1, 2);

      expect(gameboard.allShipsSunk()).toBe(false);
    });

    it("should return true meaning all ships has sunken", () => {
      const gameboard = new Gameboard();

      gameboard.addShip(new Ship(1), 1, 2);
      gameboard.addShip(new Ship(1), 3, 5);

      gameboard.receiveAttack(1, 2);
      gameboard.receiveAttack(3, 5);

      expect(gameboard.allShipsSunk()).toBe(true);
    });
  });

  describe("checkForShip", () => {
    it("should return false meaning there is not a ship in the cell", () => {
      const gameboard = new Gameboard();

      gameboard.addShip(new Ship(1), 1, 2);
      gameboard.addShip(new Ship(1), 3, 5);

      expect(gameboard.checkForShip(2, 2)).toBe(false);
    });

    it("should return true meaning there is a ship in the cell", () => {
      const gameboard = new Gameboard();

      gameboard.addShip(new Ship(1), 1, 2);
      gameboard.addShip(new Ship(1), 3, 5);

      expect(gameboard.checkForShip(3, 5)).toBe(true);
    });
  });
});
