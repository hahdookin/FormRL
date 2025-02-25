import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
  UncontrolledPopover,
} from "reactstrap";
// import "./styles.css";

interface Player {
  firstName: string;
  lastName: string;
  email: string;
}

const randomChance = (x: number, y: number) => {
  return Math.random() <= x / y;
};

const FormItem = ({ formItem, markDownFn, isDone }: any) => {
  const { type, prompt } = formItem;

  if (type === "button") {
    return (
      <FormGroup>
        <Label>{prompt}</Label>
        <Input
          valid={isDone}
          type="button"
          value="Click"
          onClick={() => markDownFn(true)}
        >
          Hello
        </Input>
      </FormGroup>
    );
  }
  if (type === "input") {
    return (
      <FormGroup>
        <Label>{prompt}</Label>
        <Input valid={isDone} value="Input" onClick={() => markDownFn(true)}>
          Hello
        </Input>
      </FormGroup>
    );
  }
  return <>`Unknown: ${type}`</>;
};

const generatePlayer = (): Player => {
  const player: Player = {
    firstName: "Chris",
    lastName: "Pane",
    email: "chris.pane@yahoo.com",
  };
  return player;
};

const generateDungeon = () => {
  const dungeon: any = {};
  const NUM_FLOORS = 3;
  for (let i = 0; i < NUM_FLOORS; i++) {
    const floorNumber = i + 1;
    const floor: any = {};

    floor.formItems = [...Array(5)].map(() => {
      return { type: "button" };
    });
    floor.formItems = [
      { type: "button", prompt: "Click this button" },
      { type: "input", prompt: "Enter you first name" },
      { type: "date", prompt: "Select today's date" },
    ];

    dungeon[floorNumber] = floor;
  }
  return dungeon;
};

interface PlayerInfoProps {
  player: Player;
}
const PlayerInfo = ({ player }: PlayerInfoProps) => {
  return (
    <div>
      <span>
        Name: {player.firstName} {player.lastName}
      </span>
      <br />
      <span>Email: {player.email}</span>
    </div>
  );
};

export default function App() {
  const dungeon = useMemo(() => generateDungeon(), []);
  const player = useMemo(() => generatePlayer(), []);

  const [curFloor, setCurFloor] = useState(1);
  const [curFormItemIndex, setCurFormItemIndex] = useState(0);
  const [curFormItemDone, setCurFormItemDone] = useState(false);

  const maxFatigue = 10;
  const [curFatigue, setCurFatigue] = useState(maxFatigue);

  const floor = dungeon[curFloor];
  const { formItems } = floor;

  const onNextClicked = () => {
    const nextFormItem = curFormItemIndex + 1;
    if (nextFormItem >= formItems.length) {
      setCurFloor(curFloor + 1);
      setCurFormItemIndex(0);
    } else {
      setCurFormItemIndex(curFormItemIndex + 1);
    }
    setCurFormItemDone(false);
  };

  const finishCurFormItem = () => {
    if (curFormItemDone) return;
    setCurFormItemDone(true);
    setCurFatigue(curFatigue - 1);
  };

  return (
    <div className="App">
      <Navbar className="bg-body-tertiary">
        <NavbarBrand href="/">FormRL</NavbarBrand>
        <Nav className="me-auto">
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
        </Nav>

        <UncontrolledDropdown nav inNavbar style={{ listStyle: "none" }}>
          <DropdownToggle caret>
            Welcome <b>{player.firstName}</b>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem active={false}>
              <PlayerInfo player={player} />
            </DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Navbar>

      <Row className="justify-content-center m-4">
        <Col sm={6} className="border">
          <Form className="p-1 m-1">
            <FormItem
              formItem={formItems[curFormItemIndex]}
              isDone={curFormItemDone}
              markDownFn={finishCurFormItem}
            />
          </Form>
          <div className="m-auto mb-4" style={{ width: "fit-content" }}>
            <Button
              color="primary"
              disabled={!curFormItemDone}
              onClick={onNextClicked}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>

      <h2>
        Level: {curFloor} of {Object.keys(dungeon).length}
        <br />
        FormItemIndex: {curFormItemIndex} of {formItems.length - 1}
        <br />
        Fatigue: {curFatigue}
      </h2>
    </div>
  );
}
