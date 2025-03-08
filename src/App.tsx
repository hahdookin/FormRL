import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
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
  Progress,
  Row,
  UncontrolledDropdown,
  UncontrolledPopover,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
// import "./styles.css";

interface Player {
  firstName: string;
  lastName: string;
  email: string;
}

const SplashScreen = ({ showSplash, setShowSplash }) => {
  return (
    <Fade in={showSplash}>
      <div className="App">
        <Row className="align-items-center" style={{ height: "80vh" }}>
          <Card className="w-50 mx-auto">
            <CardBody>
              <CardTitle>
                <h4>You are trying to download a PDF</h4>
              </CardTitle>
              <CardSubtitle className="text-muted">
                <h6>Its pretty dificult</h6>
              </CardSubtitle>
              <CardText>Some text here!</CardText>
              <Fade timeout={2000}>
                <Button color="primary" onClick={() => setShowSplash(false)}>
                  Start
                </Button>
              </Fade>
            </CardBody>
          </Card>
        </Row>
      </div>
    </Fade>
  );
};

const randomChance = (x: number, y: number) => {
  return Math.random() <= x / y;
};

const FormItem = ({ formItem, markDoneFn, isDone }: any) => {
  const { type, prompt } = formItem;
  const [inputState, setInputState] = useState("");

  if (type === "button") {
    return (
      <FormGroup>
        <Label>{prompt}</Label>
        <Input
          valid={isDone}
          type="button"
          value="Click"
          onClick={() => markDoneFn(true)}
        >
          Hello
        </Input>
      </FormGroup>
    );
  }
  if (type === "input") {
    const { expected } = formItem;
    return (
      <FormGroup>
        <Label>{prompt}</Label>
        <Input
          valid={isDone}
          value={inputState}
          onChange={(e) => {
            setInputState(e.target.value);
            markDoneFn(e.target.value === expected);
          }}
        />
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

interface FormItem {
  type: "button" | "input" | "date";
  prompt: string;
}

const generateDungeon = ({ player }: { player: Player }) => {
  const dungeon: any = {};
  const NUM_FLOORS = 3;
  for (let i = 0; i < NUM_FLOORS; i++) {
    const floorNumber = i + 1;
    const floor: any = {};

    floor.formItems = [
      { type: "button", prompt: `Click this button: ${floorNumber}` },
      {
        type: "input",
        prompt: "Enter you first name",
        expected: player.firstName,
      },
    ];
    // { type: "date", prompt: "Select today's date" },

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
  const player = useMemo(() => generatePlayer(), []);
  const dungeon = useMemo(() => generateDungeon({ player }), []);

  const [showSplash, setShowSplash] = useState(false);

  const [curFloor, setCurFloor] = useState(1);
  const [curFormItemIndex, setCurFormItemIndex] = useState(0);
  const [curFormItemDone, setCurFormItemDone] = useState(false);
  const [inBetweenFloors, setInBetweenFloors] = useState(false);

  const maxFatigue = 10;
  const [curFatigue, setCurFatigue] = useState(maxFatigue);

  const floor = dungeon[curFloor];
  const { formItems } = floor;

  const onNextClicked = () => {
    const nextFormItem = curFormItemIndex + 1;
    if (nextFormItem >= formItems.length) {
      setInBetweenFloors(true);
    }
    setCurFormItemIndex(curFormItemIndex + 1);
    setCurFormItemDone(false);

    setCurFatigue(curFatigue - 1);
  };

  if (showSplash) {
    return (
      <SplashScreen showSplash={showSplash} setShowSplash={setShowSplash} />
    );
  }

  return (
    <div className="App">
      <Fade in={!showSplash}>
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
          <Col sm={6}>
            <Progress
              value={(curFormItemIndex / formItems.length) * 100}
              animated
            />
          </Col>
        </Row>

        <Row className="justify-content-center m-4">
          <Col sm={6} className="border">
            {inBetweenFloors ? (
              <>
                <Form className="p-1 m-1">
                    <>Choose an upgrade</>
                </Form>
                <div className="m-auto mb-4" style={{ width: "fit-content" }}>
                    <Button
                      onClick={() => {
                        setInBetweenFloors(false);
                        setCurFloor(curFloor + 1);
                        setCurFormItemIndex(0);
                      }}
                    >
                      Next
                    </Button>
                </div>
              </>
            ) : (
              <>
                <Form className="p-1 m-1">
                  <FormItem
                    formItem={formItems[curFormItemIndex]}
                    isDone={curFormItemDone}
                    markDoneFn={setCurFormItemDone}
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
              </>
            )}
          </Col>
        </Row>

        <p>
          Level: {curFloor} of {Object.keys(dungeon).length}
          <br />
          FormItemIndex: {curFormItemIndex} of {formItems.length - 1}
          <br />
          Fatigue: {curFatigue}
        </p>
      </Fade>
    </div>
  );
}
